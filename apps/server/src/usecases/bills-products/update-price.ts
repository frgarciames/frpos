import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { MissingParamsError } from "@/domain/errors/missing-params";
import { BillsProductsRepository } from "@/repositories/bills_products";
import { NotFoundError } from "@/domain/errors/not-found";

type UpdatePriceUsecaseProps = {
  billsProductsRepository: BillsProductsRepository;
};
type UpdatePriceUsecaseInput = InputUsecase<{
  billId: number;
  productId: number;
  new_price: number;
}>;

export const updatePriceUsecase =
  ({ billsProductsRepository }: UpdatePriceUsecaseProps) =>
  async ({
    organization,
    billId,
    new_price,
    productId,
    user,
  }: UpdatePriceUsecaseInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!new_price || !billId || !productId)
      throw MissingParamsError({ billId, productId, new_price });
    const existingRow = await billsProductsRepository.getBy({
      billId,
      productId,
    });
    if (!existingRow.length)
      throw NotFoundError("BillProduct", `${billId}-${productId}`);
    await billsProductsRepository.updateRow({
      billId,
      productId,
      overrides: {
        price: new_price,
      },
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return billsProductsRepository.getBy({
      billId,
      productId,
    });
  };
