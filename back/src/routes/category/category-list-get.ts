import { CategorySchema, ICategory } from "../../models/category";
import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const categoryGetAll = (server: ZodFastifyInstance) =>
  server.route({
    method: "GET",
    url: "/api/category",
    onRequest: allowRoles([Role.ADMIN, Role.MANAGER, Role.CLIENT]),
    async handler(request) {
      const { auth } = request;
      const categories = await this.categoryService.getAll(auth);

      return categories;
    },
  });
