import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const productDelete = (server: ZodFastifyInstance) =>
  server.route({
    method: "DELETE",
    url: "/api/product/:id",
    onRequest: allowRoles([Role.ADMIN]),

    async handler(request, reply) {
      const { auth, query: id } = request;
      await this.productService.delete(auth, id as number);

      return await reply.status(201).send();
    },
  });
