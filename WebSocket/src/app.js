import express from 'express';
import { engine } from 'express-handlebars';
import { __dirname } from "./utils.js";
import viewsRouter from './routes/views.router.js';

const app = express();

//middlewares de aplicación
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); //esto me pasa la ruta global de tosos los archivos en public

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//router
app.use("/api/views", viewsRouter);

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
})