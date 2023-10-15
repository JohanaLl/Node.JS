import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from "socket.io";
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'

const app = express();

//middleware entendimiento de los datos de la app
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

//handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routes
app.use("/", viewsRouter);

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})

//sockerServer
const sockerServer = new Server(httpServer);
const messages = [];

sockerServer.on('connection', (socket) => {
    console.log(`Cliente connectado: ${socket.id}`);

    socket.on('newUser', (user) => {
        socket.broadcast.emit("userConnected", user);
        socket.emit('connected');
    });
    socket.on('message', info => {
        messages.push(info);
        sockerServer.emit('chat', messages);
    })
})