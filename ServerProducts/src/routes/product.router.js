import { Router } from "express";
import { productManager } from "../ProductManagerFile.js";

const router = Router();

//Get all products
router.get("/api/products", async (req, res) => {
    try {
        const products = await productManager.getProducts(req.query);
        res.status(200).json({ message: "Products found ", products});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get products by id
router.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.getProductById(+id);
        if (!product) {
            return res.status(404).json({ message: "Product not foun with id provided" });            
        }
        res.status(200).json({ message: "Procut found", product });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Create a product
router.post("/api/products", async (req, res) => {
    //required params in body
    const { title, price, code, stock } = req.body;
    if (!title || !price || !code || !stock) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const response = await productManager.addProduct(req.body);
        res.status(200).json({ message: "Product created", user: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Delete a product
router.delete("/api/products/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
        const response = await productManager.deleteProduct(+idProduct);
        if (!response) {
            return res.status(404).json({ message: "Product not found with the id provided" })
        }
        res.status(200).json({ message: "Product deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

//Update a producto
router.put("/api/products/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
        const response = await productManager.updateProduct(+idProduct, req.body);
        if (!response) {
            return res.status(404).json({ message: "Product not found with the id provided" })
        }
        res.status(200).json({ message: "Product updated"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

export default router;