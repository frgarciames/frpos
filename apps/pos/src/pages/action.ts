import { store } from "@/lib/store";
import { createCategory } from "@/services/category";
import { createProduct, updateProduct } from "@/services/product";
import { ActionFunction } from "react-router-dom";

const ACTION_SERVICE = {
  create_category: createCategory,
  create_product: createProduct,
  update_product: updateProduct,
};

export const rootAction: ActionFunction = async ({ request }) => {
  if (!store.organization) return {};
  const formData = await request.formData();
  const entries = Object.fromEntries(formData.entries());
  const { action, ...payload } = entries;
  try {
    await ACTION_SERVICE[action as keyof typeof ACTION_SERVICE](
      payload as any,
      store.organization
    );
    return {
      state: "OK",
    };
  } catch (error: any) {
    return {
      state: "ERROR",
      error: error.message,
    };
  }
};
