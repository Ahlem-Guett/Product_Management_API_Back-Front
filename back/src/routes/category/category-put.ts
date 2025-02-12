import { CategorySchema, ICategory } from "../../models/category";
import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const categoryPut = (server: ZodFastifyInstance) =>
  server.route({
    method: "PUT",
    url: "/api/category",
    onRequest: allowRoles([Role.ADMIN, Role.MANAGER]),

    async handler(request, reply) {
      const { auth, body } = request;
      await this.categoryService.update(auth, body as ICategory);

      return await reply.status(201).send();
    },
  });
