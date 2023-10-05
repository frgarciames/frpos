import type {
  User as ClerkUser,
  Organization as ClerkOrganization,
} from "@clerk/backend";
import { bills } from "../db/schema/bills";
import { products } from "../db/schema/products";
import { zones } from "../db/schema/zones";
import { categories } from "../db/schema/categories";
import { tables } from "../db/schema/tables";
import { zReports } from "../db/schema/z_reports";
import { billsProducts } from "@/db/schema/bills_products";
import { billsSnapshots } from "@/db/schema/bills_snapshots";

export type User = ClerkUser;
export type Organization = ClerkOrganization;

export type Bill = typeof bills.$inferSelect;
export type NewBill = typeof bills.$inferInsert;

export type BillProduct = typeof billsProducts.$inferSelect;
export type NewBillProduct = typeof billsProducts.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Zone = typeof zones.$inferSelect;
export type NewZone = typeof zones.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Table = typeof tables.$inferSelect;
export type NewTable = typeof tables.$inferInsert;

export type ZReport = typeof zReports.$inferSelect;
export type NewZReport = typeof zReports.$inferInsert;

export type BillSnapshot = typeof billsSnapshots.$inferSelect;
export type NewBillSnapshot = typeof billsSnapshots.$inferInsert;
