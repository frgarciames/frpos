import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { AbstractRepository } from "./abstract";
import { zones } from "../db/schema/zones";
import { NewZone, Zone } from "../entities";

export class ZonesRepository extends AbstractRepository<
  typeof zones,
  Zone,
  NewZone
> {
  constructor(db: PlanetScaleDatabase<Record<string, never>>) {
    super(db, zones);
  }
}
