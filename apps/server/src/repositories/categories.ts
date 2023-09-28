import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { categories } from "../db/schema/categories";
import { Category, NewCategory } from "../entities";
import { AbstractRepository } from "./abstract";
import { eq } from "drizzle-orm";

export class CategoriesRepository extends AbstractRepository<
  typeof categories,
  Category,
  NewCategory
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, categories);
  }
  getCategoryByName = async (
    organization: string,
    name: string
  ): Promise<Category | null> => {
    const category = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.organization, organization))
      .where(eq(this.table.name, name));
    return category[0] ?? null;
  };
}
