const fs = require('fs');

//Syncrono
// crear
/**
 * writeFileSync siempre sobreescribe la información del archivo
 * en este caso queda solo segunda linea de texto
 */
// fs.writeFileSync('prueba.txt', 'primera linea de texto')
// fs.writeFileSync('prueba.txt', 'segunda linea de texto')

// leer 
// const texto = fs.readFileSync('prueba.txt', 'utf-8')
// console.log(texto);

// eliminar
// fs.unlinkSync('prueba.txt')

// agregar
/**
 * Añade información al archivo
 * También crea el archivo
 */
// fs.appendFileSync('prueba.txt', ' Segunda linea de texto')

//buscar
// console.log(fs.existsSync('prueba.txt'));


//Asyncrono
// crear
// fs.writeFile('prueba.txt', 'primera linea de texto asincrona', (error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Archivo creado con exito');
//     }
// })
// leer 
// fs.readFile('pruebaAsync.txt', 'utf-8', (error, data) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(data);
//     }
// })

// eliminar
// fs.unlink('prueba.txt', (error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Archivo eliminado con exito');
//     }
// })

//buscar

//Promesas
// crear
// fs.promises.writeFile('prueba.txt', 'primera linea de texto asincrona')
// .then(() => console.log('Archivo creado con exito'))
// .catch(error => console.log(error))

// leer
// fs.promises.readFile('prueba.txt', 'utf-8')
// .then(data => console.log(data))
// .catch(error => console.log(error))

// // eliminar
// fs.promises.unlink('prueba.txt')
// .then(() => console.log('Archivo eliminado con exito'))
// .catch(error => console.log(error))

//buscar
// console.log(fs.existsSync('prueba.txt'));

const users = [
    {
        name: 'Juan',
        age: 35
    },
    {
        name: 'Maria',
        age: 35
    },
    {
        name: 'Laura',
        age: 35
    },
    {
        name: 'Luis',
        age: 35
    }
]

//JSON.stringify() para pasar un array a un texto plano json (string)
fs.promises.writeFile('User.json', JSON.stringify(users))
.then(() => console.log('Archivo creado con exito'))
.catch(error => console.log(error))

//JSON.parse() pasa un texto plano JSON a un objeto JS
fs.promises.readFile('User.json', 'utf-8')
.then(data => console.log(JSON.parse(data)))
.catch(error => console.log(error))
