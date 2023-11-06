import { Router } from "express";
import { clientManager } from "../dao/managers/clientManager.js";

const router = Router();

router.get('/', async(req, res) => {
    const response = await clientManager.findAggre();
})

export default router;