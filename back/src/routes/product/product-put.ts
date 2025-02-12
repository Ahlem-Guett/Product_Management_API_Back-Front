import { IProduct, ProductSchema } from "../../models/product";
import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const productPut = (server: ZodFastifyInstance) =>
  server.route({
    method: "PUT",
    url: "/api/product",
    onRequest: allowRoles([Role.ADMIN, Role.MANAGER]),

    async handler(request, reply) {
      const { auth, body } = request;
      await this.productService.update(auth, body as IProduct);

      return await reply.status(201).send();
    },
  });
