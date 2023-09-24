class ProductManager {

    constructor() {
        this.products = []
    }

    getProducts() {
        console.log(this.products);
        return this.products
    }

    getProductsById(id) {
        const product = this.products.find((product) => product.id == id)
        !product ? console.log('Not found')
        : console.log(product)
        return product
    }

    addProduct(product) {
        const {
            title,
            description,
            price,
            thumbanil,
            code,
            stock
        } =  product

        if (!title || !price || !stock || !code) {
            console.log('Some data is missing')
            return
        }

        const isCodeRepeat = this.products.some(product => product.code === code)
        if (isCodeRepeat) { 
            console.log('Code alrteady used') 
            return
        }

        let id
        !this.products.length
            ? id = 1
            : id = this.products[this.products.length-1].id + 1
      
        const newProduct = {id, ...product}
        this.products.push(newProduct)
        console.log('Product added');
        return newProduct
    }


}

const product1 = new ProductManager()
product1.addProduct({
    title:'Manzana', 
    description:'Manzana roja', 
    price: 2000, 
    thumbanil:'Path', 
    code:123456, 
    stock:10})
product1.addProduct({
    title:'Pera', 
    description:'Pera', 
    price:2000, 
    thumbanil: 'Path', 
    code: 123457, 
    stock:10})
// product1.addProduct('Banano', 'Banano', 2000, 'Path', 123458, 20)
// product1.addProduct('Durazno', 'Durazno', 2000, 'Path', 123456, 10)

product1.getProducts()
product1.getProductsById(1)