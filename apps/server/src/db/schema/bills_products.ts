import { relations } from "drizzle-orm";
import { auditColumns } from "../audit";
import {
  bigint,
  int,
  json,
  mysqlTable,
  primaryKey,
} from "drizzle-orm/mysql-core";
import { products } from "./products";
import { bills } from "./bills";

export const billsProducts = mysqlTable(
  "bills_products",
  {
    productId: bigint("product_id", { mode: "number" }).notNull(),
    billId: bigint("bill_id", { mode: "number" }).notNull(),
    quantity: int("quantity").notNull(),
    overrides: json("overrides"),
    ...auditColumns,
  },
  (t) => ({
    pk: primaryKey(t.productId, t.billId),
  })
);

export const billsProductsRelations = relations(billsProducts, ({ one }) => ({
  product: one(products, {
    fields: [billsProducts.productId],
    references: [products.id],
  }),
  bill: one(bills, {
    fields: [billsProducts.billId],
    references: [bills.id],
  }),
}));
