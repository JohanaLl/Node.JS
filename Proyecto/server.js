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
        if (!user) {
            res.status(404).json({message: "User not found whit id provided"})
        }
        res.status(200).json({message:'User found: ', user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
})

// /api/character => buscar todos los personales o crear un personaje

app.get('/api', (req,res) => {
    res.send('Probando API')
})

app.get('/api/user', (req,res) => {
    res.send('Probando USER')
})

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
})

app.post("/api/users", async (res, req) => {
    const { first_name, course, password } = req.body
    if (!first_name || !course || !password) {
        return res.status(400).json({ message: "Some data is missing" })
    } 
    try {
        const response = await manager.createUser(req.body)
        return res.status(200).json({ message: "User Create", user: response })
    } catch (error) {
        return res.status(500).json({ message:  error.message })
    }
})

app.delete("/api/users/:idUser", async (req, res) => {
    const { idUSer } = req.params

    try {
        const users = await this.getUsers({});
        const user = users.find(u => u.id === id)
        if (user) {
            //const newArrayUsers = users.filter((u) => )
        }
    } catch (cons) {
        
    }
})