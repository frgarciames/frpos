import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { categories } from "../db/schema/categories";
import { Category, NewCategory, Product } from "../entities";
import { AbstractRepository } from "./abstract";
import { eq } from "drizzle-orm";
import { products } from "@/db/schema/products";

export class CategoriesRepository extends AbstractRepository<
  typeof categories,
  Category,
  NewCategory
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, categories);
  }
  getCategoriesWithProducts = async (organization: string) => {
    const rows = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.organization, organization))
      .leftJoin(products, eq(products.categoryId, this.table.id));
    const result = rows.reduce<
      Record<number, { category: Category; products: Product[] }>
    >((acc, row) => {
      const { categories: category, products: product } = row;
      if (!acc[category.id]) {
        acc[category.id] = { category, products: [] };
      }
      if (product) {
        acc[category.id].products.push(product);
      }
      return acc;
    }, {});
    return result;
  };
}
