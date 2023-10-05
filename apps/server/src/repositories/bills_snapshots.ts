import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { BillSnapshot, NewBillSnapshot } from "../entities";
import { billsSnapshots } from "@/db/schema/bills_snapshots";
import { bills } from "@/db/schema/bills";
import { eq } from "drizzle-orm";

export class BillsSnapshotsRepository extends AbstractRepository<
  typeof billsSnapshots,
  BillSnapshot,
  NewBillSnapshot
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, billsSnapshots);
  }

  async getBillsByZReport(zReportId: number) {
    const result = await this.db
      .select()
      .from(this.table)
      .innerJoin(bills, eq(this.table.billId, bills.id))
      .where(eq(bills.zReportId, zReportId));
    return result.map((row) => ({
      ...row.bills,
      ...row.bills_snapshots,
    }));
  }
}
