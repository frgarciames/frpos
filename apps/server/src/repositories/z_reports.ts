import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { zReports } from "../db/schema/z_reports";
import { ZReport } from "../entities";
import { eq, isNull } from "drizzle-orm";

export class ZReportsRepository extends AbstractRepository<
  typeof zReports,
  ZReport
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, zReports);
  }

  getOpenZReport = async (organization: string) => {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.organization, organization))
      .where(isNull(this.table.dateEnd));
    if (result.length === 0) return null;
    if (result.length > 1) throw new Error("More than one open z report found");
    return result[0];
  };
}
