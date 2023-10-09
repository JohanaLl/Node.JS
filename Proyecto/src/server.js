import express from 'express'
//Se importan con cualquier nombre porque se esportó por default
import usersRouter from './routes/users.router.js'
import productsRouter from './routes/products.router.js'
import ordersRouter from './routes/orders.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
import { engine } from "express-handlebars"
import { Server } from 'socket.io'

const app = express(); 
//Metodo que entiende la información que llega por el body
//app.use(express.json()) es un middleware a nivel de aplicación
app.use(express.json())
//Propiedad para recibir los valores de un formulario
app.use(express.urlencoded({ extended: true }))
//middleware para setear para que la carpeta public sea de libre acceso
//__dirname ayuda a crear la ruta absoluta
app.use(express.static(__dirname + "/public"))
// handlebras
app.engine("handlebars", engine());
//setean los valores de las configuraciones de handlebars
//ruta de las vistas
app.set("views", __dirname + "/views");
//nomnbre del motor de plantilla con el que se trabaja
app.set("view engine", "handlebars");

//routes
//views
//middleware a nivel de router, es decir solo se ejecuta para un router en particular
app.use('/api/views', viewsRouter);
//Users
// req => params - query - body
app.use('/api/users', usersRouter)
//Productos
app.use('/api/products', productsRouter)
//Orders
app.use('/api/orders', ordersRouter)
//Socket io
app.use('/api/views', viewsRouter);

//Servidor que trabaja con http
const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
});
//webSocket
const socketServer = new Server(httpServer);

//connection - disconnect -- eventos por defecto
socketServer.on('connection', socket => {
    // console.log(`Cliente conectado: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
    //emitir evento cuando el cliente se conecta
    // socket.emit('welcome', 'Welcome to websocket');
    socket.on('newPrice', (value) => {
        console.log(value);
        // socket.emit('PriceUpdate', value)  // Emite al cliente implecado
        // socketServer.emit('PriceUpdate', value)  //Emite a todos los clientes
        socket.broadcast.emit('PriceUpdate', value)  //Emite a todos menos al implecado
    })
})
