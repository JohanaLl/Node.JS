import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import cookieRouter from "./routes/cookie.router.js";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("SecretCookie"));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

//handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + "/views");
app.set("view engine", 'handlebars');

app.use("/", viewsRouter);
app.use("/api/cookie", cookieRouter);

app.get("/crear", (req, res) => {
    //Tiempo de vida de la cookie maxAge
    res.cookie("cookie1", "primeraCookie", { maxAge: 120000 })
    .send("Creando cookies");
});

app.get('/crear-firmada', (req, res) => {
    res.cookie("cookie2", "cookieFirmada", { maxAge: 120000, signed:true })
    .send("Creando firmada")
})

app.get('/leer', (req, res) => {
    const { cookie1 } = req.cookies;
    const { cookie2 } = req.signedCookies;
    res.json({ cookies: cookie1, signedCookies: cookie2 })
})

app.get("/eliminar", (req, res) => {
    res.clearCookie("cookie1").send("Eliminando cookie")
})

app.listen(8080, () => {
    console.log("Escuchando el puerto 8080");
});
