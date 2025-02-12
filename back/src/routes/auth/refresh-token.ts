import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

const refreshCounts: RefreshCounts = {};
export const refreshToken = (server: ZodFastifyInstance) =>
  server.route({
    method: "POST",
    url: "/api/auth/refresh-token",
    onRequest: allowRoles([Role.ADMIN, Role.MANAGER, Role.CLIENT]),
    async handler(request, reply) {
      const { id, role } = request.auth;

      if (!refreshCounts[id]) {
        refreshCounts[id] = 0;
      }
      if (refreshCounts[id] >= 5) {
        delete refreshCounts[id];
        reply.code(401).send({ error: "Refresh limit reached" });

        return;
      }

      refreshCounts[id]++;

      return {
        token: this.jwt.sign({ id, role }),
        refreshToken: this.jwt.sign({ id, role }, { expiresIn: "2d" }),
        payload: { id, role },
      };
    },
  });

export type RefreshCounts = {
  [Id: number]: number;
};
