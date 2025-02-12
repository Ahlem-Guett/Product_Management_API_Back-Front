import Product, { IFilterProduct, IProduct } from "../models/product";
import { Injectable } from "injection-js";
import { Caller, ensureRoles, Role } from "../shared/auth-guard";

@Injectable()
export class ProductService {
  async create(caller: Caller, categoryAttr: IProduct): Promise<void> {
    ensureRoles(caller, [Role.ADMIN, Role.MANAGER]);
    const category = new Product(categoryAttr);
    await category.save();
  }

  async update(caller: Caller, productAttrs: IProduct): Promise<void> {
    ensureRoles(caller, [Role.ADMIN, Role.MANAGER]);
    await Product.findByIdAndUpdate(productAttrs._id, productAttrs, {
      new: true,
    });
  }

  async delete(caller: Caller, id: number): Promise<void> {
    ensureRoles(caller, [Role.ADMIN]);
    await Product.findByIdAndDelete(id);
  }

  async getAll(caller: Caller, object: IFilterProduct) {
    ensureRoles(caller, [Role.ADMIN, Role.MANAGER, Role.CLIENT]);
    const minPrice = object.minPrice;
    const maxPrice = object.maxPrice;
    const filter: any = { deleted: false }; // Only get not deleted products

    if (minPrice) filter.price = minPrice;
    if (maxPrice) filter.price = maxPrice;

    const products = await Product.find(filter);

    return { results: products, count: products.length };
  }
}
