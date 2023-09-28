import { bigint, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { auditColumns } from "../audit";
import { tables } from "./tables";
import { relations } from "drizzle-orm";

export const zones = mysqlTable("zones", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  organization: varchar("organization", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  ...auditColumns,
});

export const zonesRelations = relations(zones, ({ many }) => ({
  tables: many(tables),
}));
