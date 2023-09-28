import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";

export const productsRoutes = (app: Elysia) => {
  app.use(clerkPlugin()).post(
    "/",
    ({ store, body }) => {
      if (!store.auth?.userId) {
        return new Response(JSON.stringify({ error: "not signed in" }));
      }
    },
    {
      body: t.Object({
        price: t.Number(),
        name: t.String(),
        category: t.String(),
      }),
    }
  );

  return app;
};
