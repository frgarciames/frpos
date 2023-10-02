import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { zones } from "../db/schema/zones";
import { NewZone, Table, Zone } from "../entities";
import { eq } from "drizzle-orm";
import { tables } from "@/db/schema/tables";

export class ZonesRepository extends AbstractRepository<
  typeof zones,
  Zone,
  NewZone
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, zones);
  }

  getZonesWithTables = async (organization: string) => {
    const rows = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.organization, organization))
      .leftJoin(tables, eq(tables.zoneId, this.table.id));
    const result = rows.reduce<Record<number, { zone: Zone; tables: Table[] }>>(
      (acc, row) => {
        const { zones: zone, tables: table } = row;
        if (!acc[zone.id]) {
          acc[zone.id] = { zone, tables: [] };
        }
        if (table) {
          acc[zone.id].tables.push(table);
        }
        return acc;
      },
      {}
    );
    return result;
  };
}
