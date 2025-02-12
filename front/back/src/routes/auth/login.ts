import { Credentials } from "../../models/user";
import { ZodFastifyInstance } from "../../shared/types";

export const authLogin = (server: ZodFastifyInstance) =>
  server.route({
    method: "POST",
    url: "/api/auth/login",

    async handler(request) {
      const { id, role } = await this.authService.login(
        request.body as Credentials
      );

      return {
        token: this.jwt.sign({ id, role }),
        refreshToken: this.jwt.sign({ id, role }, { expiresIn: "2d" }),
        payload: { id, role },
      };
    },
  });
