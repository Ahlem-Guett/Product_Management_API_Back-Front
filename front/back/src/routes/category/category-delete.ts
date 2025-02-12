import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const categoryDelete = (server: ZodFastifyInstance) =>
  server.route({
    method: "DELETE",
    url: "/api/category/:id",
    onRequest: allowRoles([Role.ADMIN]),
    async handler(request, reply) {
      const { auth, query: id } = request;
      await this.categoryService.delete(auth, id as number);

      return await reply.status(201).send();
    },
  });
