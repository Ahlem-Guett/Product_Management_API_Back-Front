declare module "fastify" {
    interface FastifyRequest {
      auth: Caller;
    }
  }

  export type Caller =
    | { id: number; role: Role.ADMIN }
    | { id: number; role: Role.MANAGER }
    | { id: number; role: Role.CLIENT } ;

export enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    CLIENT = "CLIENT",
  }
  
export function allowRoles(roles: Role[]) {
  return async function (request: any, reply: any) {
    try {
        await request.jwtVerify();
        } catch (err) {
        reply.send(err);
        }
  
      if (!roles.includes(request.auth.role)) {
        reply.code(403).send({ error: "Forbidden" });
      }
    };
  }

export function ensureRoles(caller: Caller, roles: Role[]): void {
  if (!roles.includes(caller?.role)) {
    throw new Error("UNAUTHORIZED");
  }
}