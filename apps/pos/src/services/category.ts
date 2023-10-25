import { NewCategory, Usecase } from "@frpos/server";

export const createCategory = (
  category: NewCategory,
  organizationId: string
) => {
  const usecase: Usecase = "create_category";
  return fetch(`http://localhost:1999/parties/main/${organizationId}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      usecase,
      payload: category,
    }),
  }).then((res) => res.json());
};
