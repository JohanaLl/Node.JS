const fs = require('fs')

const path = 'Products.json'

class ProductManager {

    async getProducts() {
        try {
            if (fs.existsSync(path)) {
                const productsFile = await fs.promises.readFile(path, 'utf-8')
                return JSON.parse(productsFile)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(product) {
        try {
            console.log('add');
            const products = await this.getProducts()
            let id
            //Verificar que el código no se repita
            // const isCodeRepeat = products.some(product => product.code === code)
            // console.log('isCodeRepeat: ', isCodeRepeat);
            // if (isCodeRepeat) { 
            //     console.log('Code alrteady used') 
            //     return
            // }
            //Verificar los campos obligatorios
            // if (!title || !price || !stock || !code) {
            //     console.log('Some data is missing')
            //     return
            // }
            //Incrementar el id
            !products.length ? id = 1 : id = products[products.length-1].id + 1
            
            products.push({id, ...product})
            await fs.promises.writeFile(path, JSON.stringify(products))
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const product = products.find(product => product.id === id)
            if (!product) {
                return 'No product'
            } else {
                return product
            }
        } catch (error) {
         return error   
        }
    }

    async updateProduct(id, pro) {
        try {
            const products = await this.getProducts()
            const index = products.findIndex(producto => producto.id === id)
            console.log('index ', index);
            products[index] = {
                ...products[index],
                ...pro
            }
            console.log('actualizado ', products[index]);
            // console.log(products);
            await fs.promises.writeFile(path, JSON.stringify(products[index]))
            // const newArrProducts = product.map(function(product) {
            //     console.log('map');
            //     let productModified = {...pro}
            //     console.log(productModified, '  productModified');
            //     return productModified
            // })

        } catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            const newArrProducts = products.filter(product => product.id !== id)
            await fs.promises.writeFile(path, JSON.stringify(newArrProducts))
        } catch (error) {
            return error
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

async function test() {
    const product = new ProductManager()
    // await product.addProduct(product1)
    // await product.addProduct(product2)
    // const anyProduct = await product.getProductById(6)
    // console.log('By ID: ', anyProduct);
    // await product.deleteProduct(5)
    await product.updateProduct(2, product3)
    // const products = await product.getProducts()
    // console.log(products);
}

test() 