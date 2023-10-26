import { party } from "./party";
import { makeAutoObservable } from "mobx";
import {
  Bill,
  Category,
  Product,
  Table,
  Usecase,
  ZReport,
  Zone,
} from "@frpos/server";

export class Store {
  state: "CONNECTED" | "CONNECTING" | "DISCONNECTED" = "DISCONNECTED";
  private _organization: string | null = null;
  private _categories: Array<Category & { products: Product[] }> = [];
  private _zones: Array<Zone & { tables: Table[] }> = [];
  private _zReport: ZReport | null = null;
  private _bills: Array<Bill & { products: Product[] }> = [];

  constructor() {
    makeAutoObservable(this);
  }

  set categories(categories: Array<Category & { products: Product[] }>) {
    this._categories = categories;
  }

  get categories() {
    return this._categories;
  }

  set zones(zones: Array<Zone & { tables: Table[] }>) {
    this._zones = zones;
  }

  get zones() {
    return this._zones;
  }

  set zReport(zReport: ZReport | null) {
    this._zReport = zReport;
  }

  get zReport() {
    return this._zReport;
  }

  set bills(bills: Array<Bill & { products: Product[] }>) {
    this._bills = bills;
  }

  get bills() {
    return this._bills;
  }

  set organization(organization: string | null) {
    this._organization = organization;
  }

  get organization() {
    return this._organization;
  }

  init({ org, token }: { org: string; token: string }) {
    this.state = "CONNECTING";
    this.organization = org;
    const conn = party.init({ org, token });
    conn?.addEventListener("close", (e) => {
      this.state = "DISCONNECTED";
    });
    conn?.addEventListener("open", (e: any) => {
      this.state = "CONNECTED";
    });
    conn?.addEventListener("error", (e) => {
      console.log(e);
    });
    conn?.addEventListener("message", (e) => {
      const data = JSON.parse(e.data) as {
        usecase: Usecase;
        payload: any;
      };
      if (data.usecase === "create_zone") {
        this.zones = data.payload;
      }
      if (data.usecase === "create_category") {
        this.categories = data.payload;
      }
      if (
        data.usecase === "create_product" ||
        data.usecase === "update_product"
      ) {
        const category = this.categories.find(
          (z) => z.id === data.payload[0].categoryId
        );
        if (!category) return;
        const newCategories = this.categories.map((z) => {
          if (z.id === category.id) {
            return {
              ...z,
              products: data.payload,
            };
          }
          return z;
        });
        this.categories = newCategories;
      }
      if (data.usecase === "create_table") {
        const zone = this.zones.find((z) => z.id === data.payload[0].zoneId);
        if (!zone) return;
        const newZones = this.zones.map((z) => {
          if (z.id === zone.id) {
            return {
              ...z,
              tables: data.payload,
            };
          }
          return z;
        });
        this.zones = newZones;
      }
      if (data.usecase === "init") {
        this.zReport = data.payload.zReport;
        this.zones = data.payload.zones;
        this.categories = data.payload.categories;
        this.bills = data.payload.bills;
      }
    });
  }
}

export const store = new Store();
