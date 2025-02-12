import { CategorySchema, ICategory } from "../../models/category";
import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const categoryPost = (server: ZodFastifyInstance) =>
  server.route({
    method: "POST",
    url: "/api/category",
    onRequest: allowRoles([Role.ADMIN, Role.MANAGER]),
    async handler(request, reply) {
      const { auth, body } = request;
      await this.categoryService.create(auth, body as ICategory);

      return await reply.status(201).send();
    },
  });
