import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { BillsRepository } from "@/repositories/bills";
import { NewBillProduct } from "@/entities";
import { MissingParamsError } from "@/domain/errors/missing-params";
import { BillsProductsRepository } from "@/repositories/bills_products";
import { getBillsWithProductsByZReportUsecase } from "./get-bills-with-products-by-zreport";

type BillsProductsRepositoryProps = {
  billsProductsRepository: BillsProductsRepository;
  billsRepository: BillsRepository;
};
type AddProductToBillInput = InputUsecase<NewBillProduct>;

export const addProductToBillUsecase =
  ({
    billsProductsRepository,
    billsRepository,
  }: BillsProductsRepositoryProps) =>
  async ({
    organization,
    billId,
    productId,
    user,
    overrides,
    quantity = 1,
  }: AddProductToBillInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!billId) throw MissingParamsError({ billId });
    if (!productId) throw MissingParamsError({ productId });
    const bill = await billsRepository.getBy({
      id: billId,
    });
    const getItemsUsecase = getBillsWithProductsByZReportUsecase({
      billsProductsRepository,
    });
    await billsProductsRepository.create({
      billId,
      productId,
      quantity,
      createdAt: new Date(),
      createdBy: user.id,
      overrides,
    });
    return getItemsUsecase({
      organization,
      user,
      zReportId: bill[0].zReportId,
    });
  };
