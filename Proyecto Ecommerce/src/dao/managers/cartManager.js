import { cartModel } from "../db/models/cart.model.js";
import { productManager } from "./productManager.js";

class CartManager {

    //Crear un carrito
    async createCart() {
        const newCart = { products: [] }
        const response = await cartModel.create(newCart);
        return response;
    }

    //Buscar un carrito por id
    async findById(idCart) {
        const response = await cartModel.findById(idCart)
                //toda la información
                .populate('products.product');
                //informacion en particular
                // .populate('products.product', ['title', 'price']);
        return response;
    }

    //Agregar un producto al carrito
    async addProductToCart(idCart, idProduct) {
        try {
            //Validar que el carrito exista
            const cart = await this.findById(idCart);
            if (!cart) {
                throw new Error('There is no cart with this id');
            }
            //Validar que el producto exista
            const product = await productManager.findById(idProduct);
            if (!product) {
                throw new Error('There is no product with this id');
            }
            //Verficar si el producto ya existe en el carrito
            const productIndex = cart.products.findIndex( 
                (p) => p.product.equals(idProduct));

            if (productIndex === -1) {
                cart.products.push({ product: idProduct, quantity: 1 });
            } else {
                cart.products[productIndex].quantity++;
            }

            return cart.save();

        } catch (error) {
            throw new Error('Cant add product to cart');
        }
    }

    //Eliminar un producto del carrito
    async deleteProductToCart(idCart, idProduct) {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(
                idCart,
                { $pull: { products: { product: idProduct } } },
                { new: true }
            );

            if (!updatedCart) {
                throw new Error('Cart not found');
            }

            return updatedCart.products;

        } catch (error) {
            throw new Error('Cant delete product from cart');
        }
    }


    //Actualizar todos los productos del carrito
    async updateAllProducts(idCart, products) {
        try {

            const updatedCart = await cartModel.findByIdAndUpdate(
                idCart,
                { $set: { products } },
                { new: true }
            );

            if (!updatedCart) {
                throw new Error('Cart not found');
            }

            return updatedCart.products;

        } catch (error) {
            throw new Error('Cant update products from cart');
        }
    }

    //Actualizar la cantidad de un producto
    async updateProductQuantity(idCart, idProduct, infoProduct) {
        try {
            //Validar que el carrito exista
            const cart = await this.findById(idCart);
            if (!cart) {
                throw new Error('There is no cart with this id');
            }

            //Validar que el producto exista
            const product = await productManager.findById(idProduct);
            if (!product) {
                throw new Error('There is no product with this id');
            }

            //Verficar el index del producto en el carrito
            const productIndex = cart.products.findIndex( 
                (p) => p.product.equals(idProduct));

            if (productIndex === -1) {
                throw new Error('There is no product with this id');
            } else {
                const productQuantity = infoProduct.map((product) => product.quantity);
                cart.products[productIndex].quantity = productQuantity[0];
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Cant update product quantity');
        }
    }


    //Eliminar todos los productos del carrito
    async deleteAllProducts(idCart) {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(idCart, { products: [] }, { new: true });
            return updatedCart;
        } catch (error) {
            throw new Error('Cant delete products from cart');
        }
    }
}

export const cartManager = new CartManager();