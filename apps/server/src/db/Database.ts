import { Connection, connect } from "@planetscale/database";
import {
  PlanetScaleDatabase,
  drizzle,
} from "drizzle-orm/planetscale-serverless";
type DatabaseProps = {
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
};
class Database {
  private _connection: Connection;
  private _db: PlanetScaleDatabase<Record<string, never>>;
  static instance: Database;

  constructor(props: DatabaseProps) {
    const {
      DATABASE_HOST: host,
      DATABASE_USERNAME: username,
      DATABASE_PASSWORD: password,
    } = props;
    this._connection = connect({
      host,
      username,
      password,

      fetch: (url: string, init) => {
        delete (init as any)["cache"]; // Remove cache header
        return fetch(url, init);
      },
    });
    this._db = drizzle(this._connection);
  }

  static getInstance(props: DatabaseProps) {
    if (!Database.instance) {
      Database.instance = new Database(props);
    }
    return Database.instance;
  }

  get connection(): Connection {
    return this._connection;
  }

  get db(): PlanetScaleDatabase<Record<string, never>> {
    return this._db;
  }
}
export default Database;
