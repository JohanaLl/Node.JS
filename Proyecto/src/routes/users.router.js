import { Router } from 'express';
import { manager } from '../UsersManager.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

//Middleware a nivel de endpoint, solo se ejecuta para una ruta particular
router.get('/', async (req,res) => {
    try {
        const users = await manager.getUsers(req.query)
        res.status(200).json({message:'Users found: ', users})
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

router.get('/:id', async(req, res) => {
    //Destructuring req
    const { id } = req.params
    try {
        const user = await manager.getUserById(+id)
        console.log('users', user);
        if (!user) {
            return res
                .status(404)
                .json({message: "User not found whit id provided"})
        }
        res.status(200).json({message:'User found: ', user})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
    
})

router.post("/", authMiddleware, async (req, res) => {
    console.log(req.body);
    //Validar los campos obligatorios
    const { first_name, course, password } = req.body
    if (!first_name || !course || !password) {
        return res.status(400)
            .json({ message: "Some data is missing" })
    } 
    try {
        const response = await manager.createUser(req.body)
        return res.status(200).json({ message: "User Create", user: response })
    } catch (error) {
        return res.status(500).json({ message:  error.message })
    }
})

router.delete("/:idUser", async (req, res) => {
    const { idUser } = req.params
    try {
        const response = await manager.deleteUser(+idUser)
        if (!response) {
            console.log('response', response);
            return res 
                .status(404)
                .json({ message: "User not found with the id provided" })
        }
        res.status(200).json({ message: "User deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
});

router.put("/:idUser", async(req, res) => {
    const { idUser } = req.params
    try {
        const response = await manager.updateUser(+idUser, req.body);
        console.log('response ', response);
        if (!response) {
            return res
                .status(404)
                .json({ message: "User not found with the id provided" });
        }
        res.status(200).json({ message: "User updated" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
});

//Verifica los datos que vienen del usuario si son correctos lo crea y redirecciona
router.post("/signup", async (req, res) => {
    //Validar los campos obligatorios
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !last_name || !email || !password) {
        return res.status(400)
            .json({ message: "Some data is missing" })
    } 
    try {
        const response = await manager.createUser(req.body)
        res.redirect(`/api/views/user/${response.id}`)
    } catch (error) {
        return res.status(500).json({ message:  error.message })
    }
})


//Siempre que se exporte algo por default
//donde se importe se le puede dar el nombre que uno quiera
export default router;