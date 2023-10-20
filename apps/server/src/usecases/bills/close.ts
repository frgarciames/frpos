import { MissingParamsError } from "@/domain/errors/missing-params";
import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { Bill } from "@/entities";
import { BillsRepository } from "@/repositories/bills";
import { NotFoundError } from "@/domain/errors/not-found";
import { BillsSnapshotsRepository } from "@/repositories/bills_snapshots";
import { getProductsByBill } from "../bills-products/get-products-by-bill";
import { BillsProductsRepository } from "@/repositories/bills_products";

type CloseBillProps = {
  billsRepository: BillsRepository;
  billsProductsRepository: BillsProductsRepository;
  billsSnapshotsRepository: BillsSnapshotsRepository;
};
type CloseBillInput = InputUsecase<{
  id: string;
  paymentMethod: Bill["paymentMethod"];
}>;
export const closeBillUsecase =
  ({
    billsRepository,
    billsSnapshotsRepository,
    billsProductsRepository,
  }: CloseBillProps) =>
  async ({ organization, id, paymentMethod, user }: CloseBillInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!id) throw MissingParamsError({ id });
    const existingBill = await billsRepository.get(Number(id));
    if (!existingBill) throw NotFoundError("Bill", id);

    await billsRepository.update({
      id: Number(id),
      state: "closed",
      paymentMethod,
      updatedAt: new Date(),
      updatedBy: user.id,
    });

    const products = await getProductsByBill({
      billsProductsRepository: billsProductsRepository,
    })({
      billId: id,
      user,
      organization,
    });

    await billsSnapshotsRepository.create({
      billId: Number(id),
      createdAt: new Date(),
      data: {
        products: products.map(({ product, quantity, overrides }) => ({
          ...product,
          overrides,
          quantity,
        })),
      },
    });
    return billsProductsRepository.getBillsWithProductsByZReport(
      existingBill.zReportId
    );
  };
