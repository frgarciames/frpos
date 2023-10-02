import { migrate } from "drizzle-orm/mysql2/migrator";
import Database from "../db/Database";

const { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD } =
  process.env as any;
await migrate(
  Database.getInstance({
    DATABASE_HOST,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
  }).db as any,
  {
    migrationsFolder: "drizzle",
  }
);
