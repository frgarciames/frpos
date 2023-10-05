import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { Bill, BillProduct, Product } from "@/entities";
import { MissingParamsError } from "@/domain/errors/missing-params";
import { BillsProductsRepository } from "@/repositories/bills_products";

type GetProductsByBillProps = {
  billsProductsRepository: BillsProductsRepository;
};
type GetProductsByBillInput = InputUsecase<{
  billId: string;
}>;

export const getProductsByBill =
  ({ billsProductsRepository }: GetProductsByBillProps) =>
  async ({ organization, billId }: GetProductsByBillInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!billId) throw MissingParamsError({ billId });
    const rows = await billsProductsRepository.getProductsByBill(
      Number(billId)
    );
    return rows.map((row) => ({
      product: row.products,
      quantity: row.bills_products.quantity,
      overrides: row.bills_products.overrides,
    }));
  };
