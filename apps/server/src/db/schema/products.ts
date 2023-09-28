import {
  bigint,
  float,
  int,
  mysqlTable,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { auditColumns } from "../audit";
import { relations } from "drizzle-orm";
import { categories } from "./categories";
import { billsProducts } from "./bills_products";

export const products = mysqlTable("products", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }),
  image: varchar("image", { length: 256 }),
  price: float("price"),
  stock: int("stock"),
  categoryId: bigint("category_id", { mode: "number" }),
  ...auditColumns,
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  billsProducts: many(billsProducts),
}));
