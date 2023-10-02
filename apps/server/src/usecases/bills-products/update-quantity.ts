import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { MissingParamsError } from "@/domain/errors/missing-params";
import { BillsProductsRepository } from "@/repositories/bills_products";
import { NotFoundError } from "@/domain/errors/not-found";

type UpdateQuantityUsecaseProps = {
  billsProductsRepository: BillsProductsRepository;
};
type UpdateQuantityUsecaseInput = InputUsecase<{
  billId: number;
  productId: number;
  quantity: number;
}>;

export const updateQuantityUsecase =
  ({ billsProductsRepository }: UpdateQuantityUsecaseProps) =>
  async ({
    organization,
    billId,
    quantity,
    productId,
    user,
  }: UpdateQuantityUsecaseInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!quantity || !billId || !productId)
      throw MissingParamsError({ billId, productId, quantity });
    const existingRow = await billsProductsRepository.getBy({
      billId,
      productId,
    });
    if (!existingRow.length)
      throw NotFoundError("BillProduct", `${billId}-${productId}`);
    await billsProductsRepository.updateRow({
      billId,
      productId,
      quantity,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return billsProductsRepository.getBy({
      billId,
      productId,
    });
  };
