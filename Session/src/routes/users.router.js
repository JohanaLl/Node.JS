import { Router } from "express";
import { userManager } from "../managers/users.manager.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:idUser", jwtValidation, authMiddleware, async (req, res) => {
    const { idUser } = req.params;
    console.log("user", req.user);
    const user = await userManager.findById(idUser);
    res.json({ message: "User", user});
});

export default router;