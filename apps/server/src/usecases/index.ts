import { Organization, User } from "../entities";
import {
  DELETE_ZONES_USECASES,
  GET_ZONES_USECASES,
  PATCH_ZONES_USECASES,
  POST_ZONES_USECASES,
} from "./zones";
import {
  DELETE_CATEGORIES_USECASES,
  GET_CATEGORIES_USECASES,
  PATCH_CATEGORIES_USECASES,
  POST_CATEGORIES_USECASES,
} from "./categories";
import {
  DELETE_TABLES_USECASES,
  GET_TABLES_USECASES,
  PATCH_TABLES_USECASES,
  POST_TABLES_USECASES,
} from "./tables";
import {
  DELETE_PRODUCTS_USECASES,
  GET_PRODUCTS_USECASES,
  PATCH_PRODUCTS_USECASES,
  POST_PRODUCTS_USECASES,
} from "./products";
import {
  DELETE_Z_REPORTS_USECASES,
  GET_Z_REPORTS_USECASES,
  PATCH_Z_REPORTS_USECASES,
  POST_Z_REPORTS_USECASES,
} from "./z-reports";
import {
  DELETE_BILLS_USECASES,
  GET_BILLS_USECASES,
  PATCH_BILLS_USECASES,
  POST_BILLS_USECASES,
} from "./bills";
import {
  GET_BILLS_PRODUCTS_USECASES,
  PATCH_BILLS_PRODUCTS_USECASES,
  POST_BILLS_PRODUCTS_USECASES,
} from "./bills-products";

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
export const METHODS_USECASES = {
  GET: {
    ...GET_ZONES_USECASES,
    ...GET_CATEGORIES_USECASES,
    ...GET_TABLES_USECASES,
    ...GET_PRODUCTS_USECASES,
    ...GET_Z_REPORTS_USECASES,
    ...GET_BILLS_USECASES,
    ...GET_BILLS_PRODUCTS_USECASES,
  },
  POST: {
    ...POST_ZONES_USECASES,
    ...POST_CATEGORIES_USECASES,
    ...POST_TABLES_USECASES,
    ...POST_PRODUCTS_USECASES,
    ...POST_Z_REPORTS_USECASES,
    ...POST_BILLS_USECASES,
    ...POST_BILLS_PRODUCTS_USECASES,
  },
  PATCH: {
    ...PATCH_ZONES_USECASES,
    ...PATCH_CATEGORIES_USECASES,
    ...PATCH_TABLES_USECASES,
    ...PATCH_PRODUCTS_USECASES,
    ...PATCH_Z_REPORTS_USECASES,
    ...PATCH_BILLS_USECASES,
    ...PATCH_BILLS_PRODUCTS_USECASES,
  },
  PUT: {},
  DELETE: {
    ...DELETE_ZONES_USECASES,
    ...DELETE_CATEGORIES_USECASES,
    ...DELETE_TABLES_USECASES,
    ...DELETE_PRODUCTS_USECASES,
    ...DELETE_Z_REPORTS_USECASES,
    ...DELETE_BILLS_USECASES,
  },
};

type DeletesUsecases = keyof (typeof METHODS_USECASES)["DELETE"];
type GetUsecases = keyof (typeof METHODS_USECASES)["GET"];
type PostUsecases = keyof (typeof METHODS_USECASES)["POST"];
type PatchUsecases = keyof (typeof METHODS_USECASES)["PATCH"];
type PutUsecases = keyof (typeof METHODS_USECASES)["PUT"];
export type Usecase =
  | DeletesUsecases
  | GetUsecases
  | PostUsecases
  | PatchUsecases
  | PutUsecases;
