import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const userGetAll = (server: ZodFastifyInstance) =>
  server.route({
    method: "GET",
    url: "/api/user",
    onRequest: allowRoles([Role.ADMIN]),

    async handler(request) {
      const { auth } = request;
      const users = await this.userService.getAll(auth);
      return users;
    },
  });
