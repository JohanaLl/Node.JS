import { Router } from "express";

const router = Router();

//Cookie
// router.post('/', (req, res) => {
//     const { email } = req.body;
//     res.cookie('user', email, { maxAge: 10000 }).send('Cookie created');
// });

//Session
router.post('/', (req, res) => {
    const { name, email } = req.body;
    //crear session
    req.session.name = name;
    req.session.email = email;
    res.send("session");
});

//Cookie
router.get("/view", (req, res) => {
    console.log(req);
    res.send("View cookie")
})

export default router;