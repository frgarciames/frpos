import { store } from "@/lib/store";
import { createCategory } from "@/services/category";
import { NewCategory } from "@frpos/server";
import { ActionFunction, redirect } from "react-router-dom";

export const rootAction: ActionFunction = async ({ request }) => {
  if (!store.organization) return {};
  const formData = await request.formData();
  const entries = Object.fromEntries(formData.entries());
  if (entries.action === "category") {
    await createCategory(entries as unknown as NewCategory, store.organization);
  }
  return redirect("/");
};
