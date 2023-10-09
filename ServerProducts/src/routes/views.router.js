import  { Router } from "express";
import { productsManager } from "../ProductsManager.js";

const router = Router();

router.get("/home", async (req, res) => {
    const products = await productsManager.getProducts(req.query);
    if (!products.length) {
        return res.status(200).json({ message: "No products" })
    }
    res.render("home", { products })
})

router.get("/realtimeproducts", (req, res) => {
    res.render('realTimeProducts');
})
export default router;