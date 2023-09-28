import { timestamp, varchar } from "drizzle-orm/mysql-core";

export const auditColumns = {
  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).defaultNow(),
  createdBy: varchar("created_by", {
    length: 256,
  }).notNull(),
  updatedBy: varchar("updated_by", {
    length: 256,
  }),
};
