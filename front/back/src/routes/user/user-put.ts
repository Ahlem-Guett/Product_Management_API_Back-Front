import { IUser } from "../../models/user";
import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const userPut = (server: ZodFastifyInstance) =>
  server.route({
    method: "PUT",
    url: "/api/user",
    onRequest: allowRoles([Role.ADMIN]),

    async handler(request, reply) {
      const { auth, body } = request;
      await this.userService.update(auth, body as IUser);

      return await reply.status(201).send();
    },
  });
