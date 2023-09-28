import { relations } from "drizzle-orm";
import { bigint, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { bills } from "./bills";

export const zReports = mysqlTable("z_reports", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  organization: varchar("organization", { length: 256 }).notNull(),
  dateStart: timestamp("date_start").defaultNow().notNull(),
  dateEnd: timestamp("date_end"),
});

export const zReportsRelations = relations(zReports, ({ many }) => ({
  bills: many(bills),
}));
