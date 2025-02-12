import { IProduct, ProductSchema } from "../../models/product";
import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const productPost = (server: ZodFastifyInstance) =>
  server.route({
    method: "POST",
    url: "/api/product",
    onRequest: allowRoles([Role.ADMIN, Role.MANAGER]),

    async handler(request, reply) {
      const { auth, body } = request;
      await this.productService.create(auth, body as IProduct);

      return await reply.status(201).send();
    },
  });
