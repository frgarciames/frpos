import { bigint, json, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { BillProduct, Product } from "@/entities";
import { bills } from "./bills";

type SnapshotData = {
  products: {
    id: Product["id"];
    name: Product["name"];
    price: Product["price"];
    quantity: BillProduct["quantity"];
    image: Product["image"];
    overrides: BillProduct["overrides"];
  }[];
  totalPrice: number;
};

export const billsSnapshots = mysqlTable("bills_snapshots", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  billId: bigint("bill_id", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
  data: json("data").$type<SnapshotData>().notNull(),
});

export const billsSnapshotsRelations = relations(billsSnapshots, ({ one }) => ({
  bill: one(bills, {
    fields: [billsSnapshots.billId],
    references: [bills.id],
  }),
}));
