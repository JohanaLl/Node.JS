import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import cookieRouter from "./routes/cookie.router.js";
import sessionRouter from "./routes/session.router.js";
import usersRouter from "./routes/users.router.js";
import clientsRouter from "./routes/clients.router.js";
import session from "express-session";
import fileStore  from "session-file-store";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./db/configDB.js";
import "./passport.js";


const app = express();
const FileStore = fileStore(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("SecretCookie"));

//session
//file
// app.use(session({ 
//     store: new FileStore({
//         path: __dirname + "/session"
//     }),
//     secret: 'secretSession', 
//     cookie: { maxAge: 60000 }
// }));

//mongo
const URI =  "mongodb+srv://lllanosc1:yx8JIfL7zakMi2Xk@cluster0.zzetdhr.mongodb.net/sessionDB?retryWrites=true&w=majority"; 
app.use(session({ 
    store: new MongoStore({
        mongoUrl: URI,
    }),
    secret: 'secretSession', 
    cookie: { maxAge: 60000 }
}));

//passport
app.use(passport.initialize());
app.use(passport.session());


//handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + "/views");
app.set("view engine", 'handlebars');

//routes
app.use("/", viewsRouter);
app.use("/api/cookie", cookieRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/users", usersRouter);
app.use("/api/clients", clientsRouter);

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
