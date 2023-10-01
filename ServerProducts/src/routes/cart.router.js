import { Router } from "express";

const router = Router();

router.get("/");
router.get("/:cid")
router.post("/:cid/product/:pid");

export default router;
