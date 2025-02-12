import mongoose from "mongoose";
import dotenv from "dotenv";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import cors from "@fastify/cors";
import { registerServices } from "./services/services";
import { registerRoutes } from "./routes/routes";
import fastifyJwt from "@fastify/jwt";

dotenv.config();

const fastifyServer = Fastify({ logger: true })
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .withTypeProvider<ZodTypeProvider>()
  .register(cors, { origin: "*", credentials: true });

fastifyServer.register(fastifyJwt, {
  secret: "Product-Management-$$!@",
  decoratorName: "auth",
  sign: {
    expiresIn: "10h",
  },
});

async function run() {
  mongoose
    .connect(process.env.MONGODB_URL as string,{ dbName: "Product" })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}
run().catch(console.dir);

(async () => {
  await registerServices(fastifyServer);
  await registerRoutes(fastifyServer);

  try {
     await fastifyServer.listen({ port: 3002});
  } catch (error) {
    fastifyServer.log.error(error);
    process.exit(1);
  }
})();
