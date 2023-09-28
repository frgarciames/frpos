import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { Bill } from "../entities";
import { eq } from "drizzle-orm";
import { billsProducts } from "../db/schema/bills_products";
import { bills } from "../db/schema/bills";
import { products } from "../db/schema/products";

export class BillsProductsRepository extends AbstractRepository<
  typeof billsProducts,
  Bill
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, billsProducts);
  }
}
