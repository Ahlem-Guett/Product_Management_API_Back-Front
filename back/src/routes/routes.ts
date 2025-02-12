import * as api from "./index";
import { ZodFastifyInstance } from "../shared/types";

export async function registerRoutes(server: ZodFastifyInstance) {
  api.categoryPost(server);
  api.categoryDelete(server);
  api.categoryGetAll(server);
  api.categoryPut(server);

  api.productDelete(server);
  api.productGetAll(server);
  api.productPost(server);
  api.productPut(server);

  api.userDelete(server);
  api.userGetAll(server);
  api.userPost(server);
  api.userPut(server);

  api.authLogin(server);
  api.refreshToken(server);
}
