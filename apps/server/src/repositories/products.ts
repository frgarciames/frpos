import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { products } from "../db/schema/products";
import { Product } from "../entities";

export class ProductsRepository extends AbstractRepository<
  typeof products,
  Product
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, products);
  }
}
