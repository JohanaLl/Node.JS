import express from 'express'
import { manager } from './UserManager.js'

const app = express()
//Metodo que entiende la información que llega por el body
app.use(express.json())

// req => params - query - body
app.get('/api/users', async (req,res) => {
    try {
        const users = await manager.getUsers(req.query)
        res.status(200).json({message:'Users found: ', users})
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

app.get('/api/users/:id', async(req, res) => {
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

app.post("/api/users", async (req, res) => {
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

app.delete("/api/users/:idUser", async (req, res) => {
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

app.put("/api/users/:idUser", async(req, res) => {
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

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
});
