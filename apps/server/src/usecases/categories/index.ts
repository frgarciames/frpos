import { createCategoryUsecase } from "./create";
import { deleteCategoryUsecase } from "./delete";
import { getCategoryUsecase } from "./get";
import { getCategoriesUsecase } from "./get-all";
import { updateCategoryUsecase } from "./update";

export const GET_CATEGORIES_USECASES = {
  get_category: {
    fn: getCategoryUsecase,
  },
  get_categories: {
    fn: getCategoriesUsecase,
  },
};
export const DELETE_CATEGORIES_USECASES = {
  delete_category: {
    fn: deleteCategoryUsecase,
    needsToBroadcast: true,
  },
};
export const POST_CATEGORIES_USECASES = {
  create_category: {
    fn: createCategoryUsecase,
    needsToBroadcast: true,
  },
};
export const PATCH_CATEGORIES_USECASES = {
  update_category: {
    fn: updateCategoryUsecase,
    needsToBroadcast: true,
  },
};
