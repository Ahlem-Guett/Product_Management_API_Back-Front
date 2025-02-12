import "reflect-metadata";
import { ReflectiveInjector } from "injection-js";
import { ZodFastifyInstance } from "../shared/types";
import { CategoryService } from "./category";
import { ProductService } from "./product";
import { UserService } from "./user";
import { AuthService } from "./auth";

declare module "fastify" {
  interface FastifyInstance {
    categoryService: CategoryService;
    productService: ProductService;
    userService: UserService;
    authService: AuthService;
  }
}

export async function registerServices(instance: ZodFastifyInstance) {
  const injector = ReflectiveInjector.resolveAndCreate([
    CategoryService,
    ProductService,
    UserService,
    AuthService,
  ]);

  instance.decorate("categoryService", injector.get(CategoryService));
  instance.decorate("productService", injector.get(ProductService));
  instance.decorate("userService", injector.get(UserService));
  instance.decorate("authService", injector.get(AuthService));
}
