import { InputUsecase } from "..";
import { OrganizationNotFoundError } from "@/domain/errors/organization";
import { Bill, BillProduct, Product } from "@/entities";
import { MissingParamsError } from "@/domain/errors/missing-params";
import { BillsProductsRepository } from "@/repositories/bills_products";

type GetBillsWithProductsByZReportProps = {
  billsProductsRepository: BillsProductsRepository;
};
type GetBillsWithProductsByZReportInput = InputUsecase<{
  zReportId: number;
}>;

export const getBillsWithProductsByZReportUsecase =
  ({ billsProductsRepository }: GetBillsWithProductsByZReportProps) =>
  async ({ organization, zReportId }: GetBillsWithProductsByZReportInput) => {
    if (!organization) throw OrganizationNotFoundError();
    if (!zReportId) throw MissingParamsError({ zReportId });
    const rows = await billsProductsRepository.getBillsWithProductsByZReport(
      zReportId
    );
    const result = rows.reduce<
      Record<number, { bill: Bill; products: (Product & BillProduct)[] }>
    >((acc, row) => {
      const {
        bills_products: billProduct,
        products: product,
        bills: bill,
      } = row;
      if (!acc[bill.id]) {
        acc[bill.id] = { bill, products: [] };
      }
      if (product) {
        acc[bill.id].products.push({
          ...product,
          ...billProduct,
        });
      }
      return acc;
    }, {});
    return Object.values(result).map(({ bill, products }) => ({
      ...bill,
      products,
    }));
  };
