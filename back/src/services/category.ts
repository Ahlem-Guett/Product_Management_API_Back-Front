import Category, { ICategory } from "../models/category";
import { Injectable } from "injection-js";
import { Caller, ensureRoles, Role } from "../shared/auth-guard";

@Injectable()
export class CategoryService {
  async create(caller: Caller, categoryAttr: ICategory): Promise<void> {
    ensureRoles(caller, [Role.ADMIN, Role.MANAGER]);
    const category = new Category(categoryAttr);
    await category.save();
  }

  async update(caller: Caller, catgeoryAttrs: ICategory): Promise<void> {
    ensureRoles(caller, [Role.ADMIN, Role.MANAGER]);
    await Category.findByIdAndUpdate(catgeoryAttrs._id, catgeoryAttrs, {
      new: true,
    });
  }

  async delete(caller: Caller, id: number): Promise<void> {
    ensureRoles(caller, [Role.ADMIN]);
    await Category.findByIdAndDelete(id);
  }

  async getAll(caller: Caller) {
    ensureRoles(caller, [Role.ADMIN,Role.CLIENT,Role.MANAGER]);
    return await Category.find();
  }
}
