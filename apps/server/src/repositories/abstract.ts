import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { and, eq } from "drizzle-orm";
import { MySqlTable } from "drizzle-orm/mysql-core";

export class AbstractRepository<
  Table extends MySqlTable<any> & { [key: string]: any },
  Entity,
  NewEntity
> {
  db: PlanetScaleDatabase<Record<string, never>>;
  table: Table;

  constructor(db: PlanetScaleDatabase<Record<string, never>>, table: Table) {
    this.db = db;
    this.table = table;
  }

  get = async (id: number) => {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));
    return result[0];
  };

  getAll = (filter?: { by: string; value: string }) => {
    const result = this.db.select().from(this.table);
    if (!filter) return result;
    return result.where(eq(this.table[filter.by], filter.value));
  };

  getBy = (filters: Partial<Entity>) => {
    return this.db
      .select()
      .from(this.table)
      .where(
        and(
          ...Object.entries(filters).map(([key, value]) =>
            eq(this.table[key], value)
          )
        )
      );
  };

  delete = async (id: number) => {
    const result = await this.db
      .delete(this.table)
      .where(eq(this.table.id, id));
    return result;
  };

  create = async (table: NewEntity) => {
    const result = await this.db.insert(this.table).values(table as any);
    return this.get(Number(result.insertId));
  };

  update = async (table: Partial<Entity> & { id: number }) => {
    const result = await this.db
      .update(this.table)
      .set(table)
      .where(eq(this.table.id, table.id));
    return this.get(Number(result.insertId));
  };
}
