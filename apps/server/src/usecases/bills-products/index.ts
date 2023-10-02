import { addProductToBillUsecase } from "./add-product";
import { getBillsWithProductsByZReportUsecase } from "./get-bills-with-products-by-zreport";
import { updatePriceUsecase } from "./update-price";
import { updateQuantityUsecase } from "./update-quantity";

export const GET_BILLS_PRODUCTS_USECASES = {
  get_bills: {
    fn: getBillsWithProductsByZReportUsecase,
  },
};
export const POST_BILLS_PRODUCTS_USECASES = {
  add_product: {
    fn: addProductToBillUsecase,
    needsToBroadcast: true,
  },
};
export const PATCH_BILLS_PRODUCTS_USECASES = {
  update_price: {
    fn: updatePriceUsecase,
    needsToBroadcast: true,
  },
  update_quantity: {
    fn: updateQuantityUsecase,
    needsToBroadcast: true,
  },
};
