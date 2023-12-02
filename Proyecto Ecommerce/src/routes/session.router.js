import { Router } from "express";
import { compareData, hashData } from "../utils.js";
import { usersManager } from "../dao/managers/usersManager.js";

const router = new Router();

router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        // return res.status(400).json({ message: "All fileds are required"})
        return res.render('error', { error: 'All fileds are required' });
    }
    try {
        const hashedPassword = await hashData(password);
        const createUser = await usersManager.createOne({
            ...req.body, 
            password:hashedPassword
        });
        //guardar la session
        req.session.user = createUser;
        res.redirect('/login')
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        // return res.status(400).json({ message: "All fileds are required"})
        return res.render('error', { error: 'All fileds are required' });
    }
    try {
        const user = await usersManager.findByEmail(email);
        if (!user) {
            return res.redirect("/signup");
        } 
        const isPasswordValid = await compareData(password, user.password);
        if (!isPasswordValid) {
            // return res.render('login', { error: 'Password is incorrect' });
            return res.render('error', { error: 'Password is incorrect' });
        }
        //rol
        const sessionInfo = (email === 'adminCoder@coder.com' && password === 'adminCoder123') 
            ? { email, first_name: user.first_name, isAdmin: true }
            : { email, first_name: user.first_name, isAdmin: false };
        //guardar la session
        req.session.user = sessionInfo;
        res.redirect('/products');
    } catch (error) {
        
    }
});

router.post("/restaurar", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersManager.findByEmail(email);
        if (!user) {
            return res.redirect("/login");
        } 
        const hashedPassword = await hashData(password)
        user.password = hashedPassword;
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
})

export default router;