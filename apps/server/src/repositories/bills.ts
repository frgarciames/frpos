import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { bills } from "../db/schema/bills";
import { Bill, NewBill } from "../entities";
import { eq } from "drizzle-orm";
import { billsProducts } from "../db/schema/bills_products";
import { products } from "../db/schema/products";

export class BillsRepository extends AbstractRepository<
  typeof bills,
  Bill,
  NewBill
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, bills);
  }

  getBillsByZReport = async (zReportId: number) => {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.zReportId, zReportId))
      .innerJoin(billsProducts, eq(this.table.id, billsProducts.billId))
      .innerJoin(products, eq(billsProducts.productId, products.id));
    return result;
  };
}
