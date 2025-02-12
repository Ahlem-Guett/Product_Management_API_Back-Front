import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcryptjs";
import { Injectable } from "injection-js";
import User, { Credentials } from "../models/user";

@Injectable()
export class AuthService {
  async login(emailAuth: Credentials) {
    const { email, password } = emailAuth;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return { id: user?._id, role: user?.role };
  }

  async logout(req: FastifyRequest, res: FastifyReply) {
    
    res.send({ message: "Logged out successfully" });
  }
}
