import {
    FastifyBaseLogger,
    FastifyInstance,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
  } from "fastify";
  import { ZodTypeProvider } from "fastify-type-provider-zod";

  export type ManyResponse<T> = {
    results: T[];
    count: number;
  };
  
  export type ZodFastifyInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    ZodTypeProvider
  >;