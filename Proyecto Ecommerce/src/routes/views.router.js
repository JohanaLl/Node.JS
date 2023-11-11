import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { productManager } from "../dao/managers/productManager.js";

const router = Router();

router.get("/signup", (req, res) => {
    res.render("signup");
});

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
    const products = await productManager.findAll(req.query);
    const cleanData = JSON.parse(JSON.stringify(products));   
    console.log(cleanData); 
    res.render("products", cleanData);
})

export default router