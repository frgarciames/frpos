import { createProductUsecase } from "./create";
import { deleteProductUsecase } from "./delete";
import { getProductUsecase } from "./get";
import { getProductsUsecase } from "./get-all";
import { updateProductUsecase } from "./update";

export const GET_PRODUCTS_USECASES = {
  get_product: {
    fn: getProductUsecase,
  },
  get_products: {
    fn: getProductsUsecase,
  },
};
export const DELETE_PRODUCTS_USECASES = {
  delete_product: {
    fn: deleteProductUsecase,
    needsToBroadcast: true,
  },
};
export const POST_PRODUCTS_USECASES = {
  create_product: {
    fn: createProductUsecase,
    needsToBroadcast: true,
  },
};
export const PATCH_PRODUCTS_USECASES = {
  update_product: {
    fn: updateProductUsecase,
    needsToBroadcast: true,
  },
};
