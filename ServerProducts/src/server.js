import express from 'express';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import { productsManager } from './ProductsManager.js';
import { __dirname } from './utils.js';
import { engine } from "express-handlebars";
import { Server } from "socket.io";

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true})) //recibe los valores del formulario
app.use(express.static(__dirname + "/public"))

//handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Productos endpoints
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/views', viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
})

//SocketServer
const socketServer = new Server(httpServer);
socketServer.on('connection', socket => {
    console.log(`Cliente conectado: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });

    socket.on('newProduct', async(product) => {
        await productsManager.addProduct(product);
        const products = await productsManager.getProducts();
        socketServer.emit("productList", products);
    })

    socket.on('deletedProduct', async(idProduct) => {
        await productsManager.deleteProduct(+idProduct);
        const products = await productsManager.getProducts();
        socketServer.emit("productList", products);

    })
})