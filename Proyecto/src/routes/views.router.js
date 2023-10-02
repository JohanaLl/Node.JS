import  { Router } from "express"
import { manager } from "../UsersManager.js";

const router = Router()
const user = {
    first_name: "Johana",
    last_name: "Llanos",
    email: "lllanos@mail.com"
}
const users = [
    {
        first_name: "Johana",
        last_name: "Llanos",
        email: "lllanos@mail.com"
    },
    {
        first_name: "Marcela",
        last_name: "Chavez",
        email: "mchavez@mail.com"
    },
    {
        first_name: "Carlos",
        last_name: "Perez",
        email: "cperez@mail.com"
    },
    {
        first_name: "Angie",
        last_name: "Llanos",
        email: "allanos@mail.com"
    }
]
router.get("/view1", (req, res) => {
    res.render("view1")
})
router.get("/view2", (req, res) => {
    res.render("view2")
})

router.get("/user", (req, res) => {
    res.render("user", { user });
});

router.get("/users", (req, res) => {
    res.render("users", { users });
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get('/user/:idUser', async ( req, res) => {
    const { idUser } = req.params
    const user = await manager.getUserById(+idUser)
    res.render("profile", { user, style: "second" })

})

export default router;