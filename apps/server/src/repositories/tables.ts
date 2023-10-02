import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { tables } from "../db/schema/tables";
import { NewTable, Table } from "../entities";

export class TablesRepository extends AbstractRepository<
  typeof tables,
  Table,
  NewTable
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, tables);
  }
}
