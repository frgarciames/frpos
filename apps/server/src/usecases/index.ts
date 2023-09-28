import { Organization, User } from "../entities";
import { createZoneUsecase } from "./zones/create";
import { deleteZoneUsecase } from "./zones/delete";
import { getZoneUsecase } from "./zones/get";
import { getZonesUsecase } from "./zones/get-all";
import { updateZoneUsecase } from "./zones/update";

export type InputUsecase<T> = Omit<T, "organization"> & {
  user: User;
  organization: Organization;
};
export type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type MethodsUsecases = Record<
  Methods,
  Record<
    string,
    {
      fn: (args: any) => any;
      needsToBroadcast?: boolean;
    }
  >
>;
export const METHODS_USECASES: MethodsUsecases = {
  GET: {
    get_zone: {
      fn: getZoneUsecase,
    },
    get_zones: {
      fn: getZonesUsecase,
    },
  },
  POST: {
    create_zone: {
      fn: createZoneUsecase,
      needsToBroadcast: true,
    },
  },
  PATCH: {
    update_zone: {
      fn: updateZoneUsecase,
      needsToBroadcast: true,
    },
  },
  PUT: {},
  DELETE: {
    delete_zone: {
      fn: deleteZoneUsecase,
      needsToBroadcast: true,
    },
  },
};
