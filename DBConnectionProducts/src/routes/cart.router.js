import { Router } from "express";
import { cartManager } from "../managers/cartManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.findAll();
        res.status(200).json({ message: "Carts", carts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post("/", async (req, res) => {
    try {
        const createCart = await cartManager.createOne(req.body);
        res.status(200).json({ message: "Cart created", cart:createCart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default router;

