import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { products } from "../db/schema/products";
import { NewProduct, Product } from "../entities";

export class ProductsRepository extends AbstractRepository<
  typeof products,
  Product,
  NewProduct
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, products);
  }
}
