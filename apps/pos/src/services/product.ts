import { NewProduct, Usecase } from "@frpos/server";

export const createProduct = async (
  payload: NewProduct,
  organizationId: string
) => {
  const usecase: Usecase = "create_product";
  try {
    const res = await fetch(
      `http://localhost:1999/parties/main/${organizationId}`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          usecase,
          payload,
        }),
      }
    );
    const json = await res.json();
    if (!res.ok) throw new Error((json as { error: string }).error);
  } catch (error) {
    throw error;
  }
};
