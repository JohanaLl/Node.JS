class ProductManager {

    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    addProduct(title, description, price, thumbanil, code, stock) {

        const product = {
            id: !this.products.length
                ? 1
                : this.products[this.products.length-1].id + 1, 
            title: typeof title !== 'undefined' ? title : console.log('Es requerido'),
            description,
            price,
            thumbanil,
            code,
            stock
        }

        !this.products.find((product) => product.code === code) 
        ? this.products.push(product)
        : console.log('El código ya existe')
    }

    getProductsById(id) {
        const producto = this.products.find((product) => product.id == id)
        ? console.log(producto)
        : console.log('Not found')
    }
}

const product1 = new ProductManager()
product1.addProduct('Manzana', 'Manzana roja', 2000, 'Path', 123456, 10)
product1.addProduct('Pera', 'Pera', 2000, 'Path', 123457, 10)
product1.addProduct('Banano', 'Banano', 2000, 'Path', 123458, 20)
product1.addProduct('Durazno', 'Durazno', 2000, 'Path', 123456, 10)

console.log(product1.getProducts());