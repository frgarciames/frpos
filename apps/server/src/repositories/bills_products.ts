import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { Bill, BillProduct, NewBillProduct } from "../entities";
import { eq } from "drizzle-orm";
import { billsProducts } from "../db/schema/bills_products";
import { bills } from "../db/schema/bills";
import { products } from "../db/schema/products";

export class BillsProductsRepository extends AbstractRepository<
  typeof billsProducts,
  BillProduct,
  NewBillProduct
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, billsProducts);
  }

  updateRow = (
    table: Partial<BillProduct> & {
      billId: number;
      productId: number;
    }
  ) => {
    return this.db
      .update(this.table)
      .set(table)
      .where(eq(this.table.billId, table.billId))
      .where(eq(this.table.productId, table.productId));
  };

  getBillsWithProductsByZReport = async (zReportId: number) => {
    const result = await this.db
      .select()
      .from(this.table)
      .innerJoin(bills, eq(this.table.billId, bills.id))
      .innerJoin(products, eq(this.table.productId, products.id))
      .where(eq(bills.zReportId, zReportId));
    return result;
  };
}
