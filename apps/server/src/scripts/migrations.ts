import { migrate } from "drizzle-orm/mysql2/migrator";
import Database from "../db/Database";

await migrate(Database.getInstance().db as any, {
  migrationsFolder: "drizzle",
});
