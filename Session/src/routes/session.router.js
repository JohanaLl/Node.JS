import { Router } from "express";
import { userManager } from "../managers/users.manager.js";
import { compareData, hashData } from "../utils.js";

const router = Router();

router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "All fileds are required"})
    }
    try {
        const hashedPassword = await hashData(password);
        const createUser = await userManager.createOne({
            ...req.body, 
            password:hashedPassword
        });
        res.status(200).json({ message: "User created", user: createUser})
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fileds are required"})
    }
    try {
        const user = await userManager.findByEmail(email);
        if (!user) {
            return res.redirect("/signup");
        } 
        // const isPasswordValid = password === user.password;
        const isPasswordValid = await compareData(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is not valid"});
        }
        //rol
        const sessionInfo = (email === 'adminCoder@coder.com' && password === 'adminCoder123') 
            ? { email, first_name: user.first_name, isAdmin: true }
            : { email, first_name: user.first_name, isAdmin: false };
        //guardar la session
        req.session.user = sessionInfo;
        res.redirect('/profile');
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.get("/destroy", async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    })
})

router.post("/restaurar", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userManager.findByEmail(email);
        if (!user) {
            return res.redirect("/login");
        } 
        const hashedPassword = await hashData(password)
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password update"});
    } catch (error) {
        res.status(500).json({ error });
    }
})

export default router;