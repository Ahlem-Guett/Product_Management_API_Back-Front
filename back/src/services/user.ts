import { Injectable } from "injection-js";
import bcrypt from "bcryptjs";
import { Caller, ensureRoles, Role } from "../shared/auth-guard";
import User, { IUser } from "../models/user";

@Injectable()
export class UserService {
  async create(caller: Caller, userAttr: IUser): Promise<void> {
    ensureRoles(caller, [Role.ADMIN]);
    const { email, password, role } = userAttr;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
  }

  async update(caller: Caller, userAttrs: IUser): Promise<void> {
    ensureRoles(caller, [Role.ADMIN]);
    const { _id, ...updates } = userAttrs;

    await User.findByIdAndUpdate(_id, updates, { new: true });
  }

  async delete(caller: Caller, id: string): Promise<void> {
    ensureRoles(caller, [Role.ADMIN]);

    await User.findByIdAndDelete(id);
  }

  async getAll(caller: Caller) {
    ensureRoles(caller, [Role.ADMIN]);
    return await User.find();
  }
}
