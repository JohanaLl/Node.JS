import { createHash } from 'crypto';
import fs from 'fs'

const path = 'Users.json'

class UsersManager {

        async getUsers(queryObj) {
        console.log('queryObj ', queryObj);
                //Destructuring los queries de la URL
                const { limit } = queryObj
        try {
            if(fs.existsSync(path))
            {
                //1. Leer el archivo
                const usersFile = await fs.promises.readFile(path, 'utf-8')
                const userData = JSON.parse(usersFile);
                //2. retornar el objeto/array js
                /**.slice() crea una copia superficial (shallow copy) de una porción de un array. 
                *  No modifica el array original, sino que devuelve una copia de los elementos seleccionados en un nuevo array.
                */
                return limit ? userData.slice(0, +limit) : userData
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async createUser(user) {
        try {
            //1. Leer el archivo -- arreglo js
            const users = await this.getUsers({})
            //generar el id
            let id
            (!users.length) ? id = 1 : id = users[users.length-1].id + 1
            const hasPassword = createHash("sha512")
            .update(user.password)
            .digest("hex");

            const newUser = { id, ...user, password: hasPassword };
            //2. Agregar al arreglo retornado el nuevo usuario que entre como parámetro
            //agrega el id más todo lo que venga en el objeto user
            users.push(newUser)
            //3. Sobreescribir la información de users en el archivo
            await fs.promises.writeFile(path, JSON.stringify(users))
            return newUser;
        } catch (error) {
            return error
        }
    }

    async getUserById(id) {
        try {
            const users = await this.getUsers({})
            console.log('users ', users);
            const user = users.find(u => u.id === id)
            if (!user) {
                return 'No user'
            } else {
                return user
            }
        } catch (error) {
            return error
        }
    }

    async deleteUser(id) {
        try {
            //Obtiene todos los usuarios
            const users = await this.getUsers({})
            //con filter() se crea un nuevo arreglo con todos los usuarios 
            //menos el que coincida con el id
            const user = users.find(u => u.id === id)
            if (user) {
                const newArrayUsers = users.filter(u => u.id !== id) 
                //sobreescribir el nuevo arreglo 
                await fs.promises.writeFile(path, JSON.stringify(newArrayUsers))
            }
            return user
        } catch (error) {
            return error
        }
    }

    async updateUser(id, obj) {
        try {
            const users = await this.getUsers({});
            const index = users.findIndex((u) => u.id === id);
            if (index === -1) {
              return null;
            }
            const updateUser = { ...users[index], ...obj };
            users.splice(index, 1, updateUser);
            await fs.promises.writeFile(path, JSON.stringify(users));
            return updateUser;
        } catch (error) {
            return error;
        }
    }

}

// PROBANDO LOS METODOS

const user1 = {
    first_name: "Juan",
    last_name: "Hoyos",
    age: 40,
    course: "JAVASCRIPT",
    password: "12345",
  };
  
  const user2 = {
    first_name: "Luis",
    last_name: "Abello",
    age: 35,
    course: "BACKEND",
    password: "abcde",
  };
  
  const user3 = {
    first_name: "Carlos",
    last_name: "Abello",
    age: 35,
    course: "BACKEND",
    password: "abcde",
  };
  
  const user4 = {
    first_name: "Laura",
    last_name: "Abello",
    age: 35,
    course: "BACKEND",
    password: "abcde",
  };
  
  const user5 = {
    first_name: "Camila",
    last_name: "Abello",
    age: 35,
    course: "BACKEND",
    password: "abcde",
  };

// async function test() {
//   const manager = new UsersManager();
//   await manager.createUser(user1);
//   await manager.createUser(user2);
//   await manager.createUser(user3);
//   await manager.createUser(user4);
//   await manager.createUser(user5);
// //   const users = await manager.getUsers()
//   //console.log(users);
//   //await manager.deleteUser(1)
// }

// test()
//Con este nombre se deben llamar todos los metodos de esta clase (manager)
export const manager = new UsersManager()

/**
 * Problema: se debe traer toda la información, pasarla a js
 * hacer las operaciones (agregar el usuario en js)
 * y luego sobreescribir el arreglo. Esto es un problema cuando hay
 * mucha información, eg. 1 millón de usuarios
 */

