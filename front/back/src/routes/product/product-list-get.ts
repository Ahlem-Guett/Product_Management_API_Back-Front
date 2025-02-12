import { IFilterProduct, ProductFilterSchema } from "../../models/product";
import { allowRoles, Role } from "../../shared/auth-guard";
import { ZodFastifyInstance } from "../../shared/types";

export const productGetAll = (server: ZodFastifyInstance) =>
  server.route({
    method: "GET",
    url: "/api/product",
    onRequest: allowRoles([Role.ADMIN, Role.MANAGER, Role.CLIENT]),

    async handler(request) {
      const { auth, query } = request;
      const products = await this.productService.getAll(
        auth,
        query as IFilterProduct
      );

      return { listing: products.results, total: products.count };
    },
  });
