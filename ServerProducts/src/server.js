import express from 'express';
import productRouter from './routes/product.router.js'

const app = express();
app.use(express.json());

//Productos
app.use('/api/products', productRouter);


app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
})