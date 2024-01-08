import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { productManager } from "../dao/managers/productManager.js";

const router = Router();

router.get("/signup", (req, res) => {
    if (req.session.user) {
        return res.redirect("/products")
    }
    res.render("signup");
});

router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/products")
    }
    res.render("login");
});

router.get("/restaurar", (req, res) => {
    console.log('view restaurar');
    res.render("restaurar");
})

router.get("/chat", (req, res) => {
    res.render("chat");
})

router.get("/home/:idUser", async (req, res) => {
    const { idUser } = req.params;
    const user = await usersManager.findById(idUser);
    const products = await productManager.findAll();
    const { first_name, last_name } = user;
    res.render("home", { first_name, last_name, products });
})

router.get("/products", async(req, res)=>{
    if (!req.session.user) {
        return res.redirect("/login");
    }
    const user = req.session.user
    const products = await productManager.findAll(req.query);
    const cleanData = JSON.parse(JSON.stringify(products));  
    console.log('user pro ', user); 
    res.render("products", { products: cleanData, user: user});
})

router.get('/error', (req, res) => {
    res.render("error");
})

router.get("/profile", (req, res) => {
    if (!req.session.passport) {
        return res.redirect("/login");
    }
    const { first_name, email } = req.user;
    res.render("profile", { user: { first_name, email }});
})
export default router