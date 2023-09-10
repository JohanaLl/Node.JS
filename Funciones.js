//Funcion tradicional
function sumar(n1, n2) {
    return n1 + n2
}
//Función flecha
const restar = (n1, n2) => {
    return n1 - n2
}

//Callback
const array = [1, 2, 3, 4, 5, 6, 7, 8]
array.filter(e=>e!==7)

const operacion = (n1, n2, cb) => {
    const resultado = cb(n1, n2)
    return resultado
}

console.log(operacion(4, 2, restar));

//FUNCIONES ASINCRONAS
console.log('primer log');
let resultado
//independientemente de lo que se demore JS lo aparta y ejecuta primero lo sincrono
// -- categoriza
setTimeout(() => {
    console.log('segundo log');
    resultado = 5 +10
}, 0);

// El resultado NaN -- porque primero se ejecuta el clnsole.log
//por esto se debe indicar que no se ejecute la línea de codigo hasta que 
//no se ejecute la función asincrona que se está esperando
console.log(`El resultado es ${resultado+5}`); // El resultado NaN
console.log('tercer log');

// Callback Anidado -- callback hell

//TABLAS USUARIOS - FAMILIARES
//Funcion que agrega un familiar de un usaurio a una BD
//Los llamados a BD son asincronos, el callback hace que no se ejecute el siguiente llamado
//si el primer llamado no es exitoso
function agregarFamiliar(idUsuario, infoFamiliar) {
    usuarios.findById(idUsuario, (error, usuario) => { //1
        if (error) {
            return error
        } else {
            //Se necesita la información del usuario para poder ejecutar esta línea
            familiaresT.finAllByLastName(usuario.lastName, (error, familiares) => { //2
                if (error) {
                    return error
                } else {
                    if(familiares.includes(infoFamiliar)) {
                        return 'Familiar ya existe en bd'
                    } else {
                        familiares.createOne(infoFamiliar, (error) => { //3
                            if (error) {
                                return error
                            } else {
                                return 'Familiar creado con exito'
                            }
                        })
                    }
                }
            })
        }
    })
}

// .THEN .CATCH
function agregarFamiliarProm(idUsuario, infoFamiliar) {
    usuarios.findById(idUsuario) //1
    .then(usuario => {
        return familiaresT.finAllByLastName(usuario.lastName) // 2
    })
    .then(familiares => {
        if (familiares.includes(infoFamiliar)) {
            return 'Familiar ya existe en bd'
        } else {
            return familiaresT.createOne(infoFamiliar) // 3
        }
    })
    .then(() => {
        return 'Familiar creado con exito'
    })
    .catch(error => error)
}

// async await

async function agregarFamiliarAsync(idUsuario, infoFamiliar) {
    try {
        const usuario = await usuarios.findById(idUsuario)
        const familiares = await familiaresT.finAllByLastName(usuario.lastName)
        if (familiares.includes(infoFamiliar)) {
            return 'Familiar ya existe'
        }
        await familiares.createOne(infoFamiliar)
        return 'Familiar creado con exito'
    } catch (error) {
        return error
    }
}
