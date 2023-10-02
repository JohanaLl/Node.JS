import { Router, json } from "express";
import { productsManager } from "../ProductsManager.js";

const router = Router();

//Get all products
router.get("/", async (req, res) => {
    try {
        const products = await productsManager.getProducts(req.query);
        if (!products.length) {
            return res.status(200),json({ message: "No products" })
        }
        res.status(200).json({ message: "Products found ", products});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get products by id
router.get("/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
        const product = await productsManager.getProductById(+idProduct);
        if (!product) {
            return res.status(404).json({ message: "Product not found with id provided" });            
        }
        res.status(200).json({ message: "Procut found", product });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Create a product
router.post("/", async (req, res) => {
    //required params in body
    const { title, description, code, price, stock, category } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const response = await productsManager.addProduct(req.body);
        res.status(200).json({ message: "Product created", product: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Delete a product
router.delete("/:idPRoduct", async (req, res) => {
    const { idPRoduct } = req.params;
    try {
        const product = await productsManager.getProductById(+idPRoduct);
        if (!product) {
            return res.status(404).json({ message: "Product not found with the id provided" })
        }
        await productsManager.deleteProduct(+idPRoduct);
        res.status(200).json({ message: "Product deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

//Update a producto
router.put("/:idPRoduct", async (req, res) => {
    const { idPRoduct } = req.params;
    try {
        const product = await productsManager.getProductById(+idPRoduct);
        if (!product) {
            return res.status(404).json({ message: "Product not found with the id provided" })
        }
        await productsManager.updateProduct(+idPRoduct, req.body);
        res.status(200).json({ message: "Product updated"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

export default router;