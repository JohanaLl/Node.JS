import { existsSync, promises } from 'fs'

const path = 'Products.json'

class ProductManager {
//No se usa fs. porque se importó promises de fs 
    async getProducts(queryObj) {
        const { limit } = queryObj;
        try {
            if (existsSync(path)) {
                const productsFile = await promises.readFile(path, 'utf-8')
                const productData = JSON.parse(productsFile)
                return limit ? productData.slice(0, +limit) : productData
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts({})
            let id
            //Incrementar el id
            !products.length ? id = 1 : id = products[products.length-1].id + 1

            const newProduct = { id, ...product }
            products.push(newProduct)
            await promises.writeFile(path, JSON.stringify(products))
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts({})
            const product = products.find(product => product.id === id)
            if (!product) {
                return 'No product'
            } else {
                return product;
            }
        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, obj) {
        try {
            const products = await this.getProducts({})
            const index = products.findIndex(producto => producto.id === id)
            if (index === -1) 
                return null

            const updateProduct = { ...products[index], ...obj}
            products.splice(index, 1, updateProduct);
            await promises.writeFile(path, JSON.stringify(products))
            return updateProduct;

        } catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts({})
            const product = products.find(product => product.id === id)
            if (product) {
                const newArrProducts = products.filter(product => product.id !== id)
                await promises.writeFile(path, JSON.stringify(newArrProducts))
            }
            return product;
        } catch (error) {
            return error;
        }
    }

}

//Prueba
const product1 = {
    title:'Manzana', 
    description:'Manzana roja', 
    price: 2000, 
    thumbanil:'PathImage', 
    code:123456, 
    stock:10
}

const product2 = {
    title:'Pera', 
    description:'Pera', 
    price:2000, 
    thumbanil: 'Path', 
    code: 123457, 
    stock:10
}

const product3 = {
    title:'Manzana', 
    description:'Manzana pecoso', 
    price:800, 
    thumbanil: 'Path', 
    code: 123459, 
    stock:10
}

// async function test() {
//     const product = new ProductManager()
//     await product.addProduct(product1)
//     await product.addProduct(product2)
//     const anyProduct = await product.getProductById(6)
//     console.log('By ID: ', anyProduct);
//     await product.deleteProduct(5)
//     await product.updateProduct(2, product3)
//     const products = await product.getProducts()
//     console.log(products);
// }

// test() 

export const productManager = new ProductManager();