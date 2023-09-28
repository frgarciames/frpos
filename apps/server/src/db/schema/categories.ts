import {
  bigint,
  mysqlTable,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { auditColumns } from "../audit";
import { relations } from "drizzle-orm";
import { products } from "./products";

export const categories = mysqlTable("categories", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }),
  organization: varchar("organization", { length: 256 }).notNull(),
  ...auditColumns,
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));
