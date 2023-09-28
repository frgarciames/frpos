import type * as Party from "partykit/server";
import { organizationUser } from "./plugins/auth";
import { CategoriesRepository } from "./repositories/categories";
import { BillsRepository } from "./repositories/bills";
import { BillsProductsRepository } from "./repositories/bills_products";
import { ProductsRepository } from "./repositories/products";
import { TablesRepository } from "./repositories/tables";
import { ZonesRepository } from "./repositories/zones";
import { ZReportsRepository } from "./repositories/z_reports";
import Database from "./db/Database";
import { getParamsFromRequest } from "./utils";
import { METHODS_USECASES, Methods } from "./usecases";
import { Organization, User } from "./entities";

type Repositories =
  | "categoriesRepository"
  | "billsRepository"
  | "billsProductsRepository"
  | "productsRepository"
  | "tablesRepository"
  | "zonesRepository"
  | "zReportsRepository";
export default class Server implements Party.Server {
  repositories: Record<Repositories, any> = {
    categoriesRepository: CategoriesRepository,
    billsRepository: BillsRepository,
    billsProductsRepository: BillsProductsRepository,
    productsRepository: ProductsRepository,
    tablesRepository: TablesRepository,
    zonesRepository: ZonesRepository,
    zReportsRepository: ZReportsRepository,
  };

  constructor(readonly party: Party.Party) {
    const db = Database.getInstance(party.env as any).db;
    Object.entries(this.repositories).forEach(([key, value]) => {
      this.repositories[key as Repositories] = new value(db);
    });
  }
  options?: Party.ServerOptions | undefined = {
    hibernate: true,
  };
  static async onBeforeConnect(request: Party.Request, lobby: Party.Lobby) {
    try {
      const userInOrganization = await organizationUser(request, lobby);

      if (!userInOrganization) {
        throw new Error("Unauthorized");
      }
      request.headers.set("X-Org-ID", userInOrganization.organization.id);
      request.headers.set("X-User-ID", userInOrganization.user.id);
      return request;
    } catch (e: any) {
      return new Response(e.message, { status: 401 });
    }
  }

  async onConnect(
    connection: Party.Connection,
    { request }: Party.ConnectionContext
  ) {
    const organizationId = request.headers.get("X-Org-ID");
    const zones = await this.repositories.zonesRepository.getAll({
      by: "organization",
      value: organizationId,
    });
    connection.send(JSON.stringify(zones));
  }

  // onMessage(
  //   message: string | ArrayBuffer,
  //   sender: Party.Connection
  // ): void | Promise<void> {
  //   // this.party.broadcast(JSON.stringify(arr), [sender.id]);
  //   // sender.send(JSON.stringify(arr));
  // }

  onClose(connection: Party.Connection) {
    this.party.broadcast(`So sad! ${connection.id} left the party!`);
  }

  async onRequest(request: Party.Request) {
    const defaultHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH, OPTIONS",
    };
    if (request.method === "OPTIONS") {
      return new Response(undefined, {
        status: 200,
        headers: defaultHeaders,
      });
    }
    const userInOrganization = await organizationUser(request, {
      id: this.party.id,
      env: this.party.env,
    });
    if (!userInOrganization) {
      return new Response("Unauthorized", {
        status: 401,
        headers: defaultHeaders,
      });
    }
    const { usecase, payload } = await getParamsFromRequest(request);
    const methodUsecase = METHODS_USECASES[request.method as Methods];
    if (!methodUsecase || !usecase || !methodUsecase[usecase]) {
      return new Response("Method not allowed", {
        status: 405,
        headers: defaultHeaders,
      });
    }
    const { fn, needsToBroadcast } = methodUsecase[usecase];
    try {
      const result = await fn(this.repositories)({
        ...payload,
        ...userInOrganization,
      });

      if (needsToBroadcast) {
        this.party.broadcast(JSON.stringify(result));
      }
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: defaultHeaders,
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: defaultHeaders,
      });
    }
  }
}

Server satisfies Party.Worker;
