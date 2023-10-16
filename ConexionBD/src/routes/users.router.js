import { Router } from "express";
import { usersManager } from '../managers/usersManager.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await usersManager.findAll()
        res.status(200).json({ message: "Users", users })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.post("/", async(req, res) => {
    try {
        const createdUser = await usersManager.createOne(req.body)
        res.status(200).json({message: 'User created', user:createdUser })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

export default router;