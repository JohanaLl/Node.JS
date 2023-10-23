import { cartModel } from "../db/models/cart.model.js";

class CartManager {

    async findAll() {
        const response = await cartModel.find();
        return response;
    }

    async createOne(obj) {
        const response = await cartModel.create(obj);
        return response;
    }
}

export const cartManager = new CartManager();