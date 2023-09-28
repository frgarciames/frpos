import { bigint, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { auditColumns } from "../audit";
import { zones } from "./zones";
import { relations } from "drizzle-orm";
import { bills } from "./bills";

export const tables = mysqlTable("tables", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  zoneId: bigint("zone_id", { mode: "number" }).notNull(),
  ...auditColumns,
});

export const tablesRelations = relations(tables, ({ one, many }) => ({
  zone: one(zones, {
    fields: [tables.zoneId],
    references: [zones.id],
  }),
  bills: many(bills),
}));
