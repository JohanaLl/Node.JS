import express from 'express'
//Se importan con cualquier nombre porque se esportó por default
import usersRouter from './routes/users.router.js'
import productsRouter from './routes/products.router.js'
import ordersRouter from './routes/orders.router.js'
import { __dirname } from './utils.js'

const app = express(); 
//Metodo que entiende la información que llega por el body
app.use(express.json())
//middleware para setear para que la carpeta public sea de libre acceso
//__dirname ayuda a crear la ruta absoluta
app.use(express.static(__dirname + "/public"))

//router
//Users
// req => params - query - body
app.use('/api/users', usersRouter)
//Productos
app.use('/api/products', productsRouter)
//Orders
app.use('/api/orders', ordersRouter)

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
});
