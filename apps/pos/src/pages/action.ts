import { store } from "@/lib/store";
import { createCategory } from "@/services/category";
import { createProduct } from "@/services/product";
import { ActionFunction } from "react-router-dom";

const ACTION_SERVICE = {
  category: createCategory,
  product: createProduct,
};

export const rootAction: ActionFunction = async ({ request }) => {
  if (!store.organization) return {};
  const formData = await request.formData();
  const entries = Object.fromEntries(formData.entries());
  const { action } = entries;
  try {
    await ACTION_SERVICE[action as keyof typeof ACTION_SERVICE](
      entries as any,
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
