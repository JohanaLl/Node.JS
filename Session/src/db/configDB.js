import mongoose from "mongoose";

const URI =  "mongodb+srv://lllanosc1:yx8JIfL7zakMi2Xk@cluster0.zzetdhr.mongodb.net/sessionDB?retryWrites=true&w=majority"; 

mongoose.connect(URI)
.then(() => console.log('Conectado a DB'))
.catch((error) => console.log(error));