const socketClient = io();

const addForm = document.getElementById("form-realtimeAdd");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");

const divProductsRealTime = document.getElementById("products-realtime");

const deleteForm = document.getElementById("form-realtimeDelete");
const inputIdProduct = document.getElementById("product-delete");

//Emitir el evento de creación
addForm.onsubmit = (e) => {
    e.preventDefault()
    const title = inputTitle.value
    const description = inputDescription.value
    const code = inputCode.value
    const price = inputPrice.value
    const stock = inputStock.value
    const category = inputCategory.value

    const product = { title, description, code, price, stock, category };

    socketClient.emit('newProduct', product);
}

//Escuchar el evento de lista de productos
socketClient.on("productList", (products) => {
    const arrayProducts = products.map(i=>{
        const product = `<ul>
            <li>${i.id} - ${i.title}
                <div>Description: ${i.description}</div>
                <div>Code: ${i.code}</div>
                <div>Price: ${i.price}</div>
                <div>Stock: ${i.stock}</div>
                <div>Category: ${i.category}</div>
            </li>
        </ul>`
        return product
    }).join(" ")
    divProductsRealTime.innerHTML = arrayProducts
})

//Emitir evento de eliminación
deleteForm.onsubmit = (e) => {
    e.preventDefault()
    const idProduct = inputIdProduct.value;
    socketClient.emit('deletedProduct', idProduct);
}