import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const userDelete = (server: ZodFastifyInstance) =>
  server.route({
    method: "DELETE",
    url: "/api/user/:id",
    onRequest: allowRoles([Role.ADMIN]),

    async handler(request, reply) {
      const { auth } = request;
      const { id } = request.query as any;

      await this.userService.delete(auth, id);

      return await reply.status(201).send();
    },
  });
