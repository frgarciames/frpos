import { bigint, boolean, mysqlEnum, mysqlTable } from "drizzle-orm/mysql-core";
import { auditColumns } from "../audit";
import { relations } from "drizzle-orm";
import { zReports } from "./z_reports";
import { tables } from "./tables";
import { billsProducts } from "./bills_products";

export const bills = mysqlTable("bills", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  state: mysqlEnum("state", ["open", "printed", "closed"]),
  deleted: boolean("deleted").default(false),
  zReportId: bigint("z_report_id", { mode: "number" }).notNull(),
  tableId: bigint("table_id", { mode: "number" }),
  ...auditColumns,
});

export const billsRelations = relations(bills, ({ one, many }) => ({
  zReport: one(zReports, {
    fields: [bills.zReportId],
    references: [zReports.id],
  }),
  table: one(tables, {
    fields: [bills.tableId],
    references: [tables.id],
  }),
  billsProducts: many(billsProducts),
}));
