import { Elysia, t } from "elysia";
import { CategoriesRepository } from "../repositories/categories";
import Database from "../db/Database";
import { organizationPlugin } from "../plugins/organization";

export const categoriesRoutes = (app: Elysia) => {
  const categoriesRepository = new CategoriesRepository(
    Database.getInstance().db
  );
  app.use(organizationPlugin).post(
    "/",
    async ({ store, body, set, organizationId }) => {
      if (!organizationId || !store?.auth?.userId) {
        set.status = 400;
        return new Response(
          JSON.stringify({ error: "organization is required" })
        );
      }
      const category = await categoriesRepository.createCategory({
        ...body,
        organization: organizationId,
        createdBy: store.auth.userId,
      });
      return new Response(JSON.stringify(category));
    },
    {
      body: t.Object({
        name: t.String(),
        organization: t.Optional(t.String()),
      }),
      beforeHandle: ({ body, set }) => {
        if (!body.name) {
          set.status = 400;
          return new Response(JSON.stringify({ error: "name is required" }));
        }
      },
    }
  );

  return app;
};
