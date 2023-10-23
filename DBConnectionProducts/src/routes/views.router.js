import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";
import { productManager } from "../managers/productManager.js";

const router = Router();

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/home/:idUser", async (req, res) => {
    const { idUser } = req.params;
    const user = await usersManager.findById(idUser);
    const products = await productManager.findAll();
    const { first_name, last_name } = user;
    res.render("home", { first_name, last_name, products });
})

export default router