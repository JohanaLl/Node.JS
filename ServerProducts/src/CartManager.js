import { existsSync, promises } from 'fs'
import { productsManager } from './ProductsManager.js'

const path = 'Carts.json';

class CartManager {

    async getCarts() {
        try {
            if (existsSync(path)) {
                const cartsFile = await promises.readFile(path, 'utf-8')
                const cartsData = JSON.parse(cartsFile)
                return cartsData
            } else {
                return []
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //Crear un nuevo carrito
    async addCart() {
        try {
            const carts = await this.getCarts()
            let id
            //Incrementar el id
            !carts.length ? id = 1 : id = carts[carts.length-1].id + 1

            const newCart = { id, products: [] }
            carts.push(newCart)
            await promises.writeFile(path, JSON.stringify(carts))
            return newCart
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts()
            const cart = carts.find(cart => cart.id === id)
            if (!cart) {
                return null
            } else {
                return cart;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //Agregar un producto al carrito
    async addProductToCart(idCart, idProduct) {
        try {
            //Lista de carritos
            const carts = await this.getCarts()
            //Validar que el carrito exista
            const cart = await this.getCartById(idCart);
            if (!cart) {
                throw new Error('There is no cart with this id');
            }

            //Validar que el producto exista
            const product = await productsManager.getProductById(idProduct);
            if (!product) {
                throw new Error('There is no product with this id');
            }
            //index del carrito al que se van a agregar productos
            const cartIndex = carts.findIndex(c=>c.id === idCart)
            //en el carrito en el arreglo de productos busque si el producto existe
            const productIndex = carts[cartIndex].products.findIndex(
                p => p.product === idProduct
            );
            if (productIndex === -1) {
                //Si no existe el producto se agrega
                const newProduct = { product: idProduct, quantity: 1}
                carts[cartIndex].products.push(newProduct)
            } else {
                //Si existe el producto se aumenta la cantidad
                carts[cartIndex].products[productIndex].quantity++;
            }
            await promises.writeFile(path, JSON.stringify(carts));
            return cart
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export const cartManager = new CartManager();