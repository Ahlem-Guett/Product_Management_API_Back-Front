import { IUser } from "../../models/user";
import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const userPost = (server: ZodFastifyInstance) =>
  server.route({
    method: "POST",
    url: "/api/user",
    onRequest: allowRoles([Role.ADMIN]),

    async handler(request, reply) {
      console.log(request.body);

      const { auth, body } = request;
      await this.userService.create(auth, body as IUser);

      return await reply.status(201).send();
    },
  });
