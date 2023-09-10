const obj = {
    first_name: 'Leidy',
    last_name: 'Llanos',
    email: 'lllanos@gmail.com',
    dni: '1234556',
    isSingle: true,
    age: 35
}
//console.log(Object.keys(obj));
//console.log(Object.values(obj));
//console.log(Object.entries(obj));

const objArray = Object.entries(obj)
const objArrayMod = objArray.map(([k, v]) => [k, `${v } modificado`])
console.log(objArrayMod);
const objMod = Object.fromEntries(objArrayMod)
console.log(objMod);

//SPRED --- concatenar arreglos u objetos
const animales1 =  ['perro', 'gato', 'raton', 'pajaro']
const animales2 = ['jirafa', 'elefante', 'leon', 'serpiente']

const animales = [...animales1,...animales2]

console.log(animales)

//Copia del array animales y se modifica la primera posición
//Esto modifica también el original
//const animalesCopia = animales
//Para no modificar el array original usamos spred operator
const animalesCopia = [...animales]
animalesCopia[0] = 'Pato'

//Los dos arrays se modificaron
console.log(animalesCopia)
console.log(animales)

// REST -- riega elementos --- agrupa
function prueba(num1, num2, ...otros) {
    console.log(otros); // [3,4,5,6,7,8,9,0]
}

prueba(1,2,3,4,5,6,7,8,9,0)

//destructuracion
console.log(obj);
const {first_name, last_name, ...otrasProps} = obj
console.log(otrasProps);

function suma(num1, num2, ...otrosNumeros) {
    console.log(num1, num2) // 1 2
}

suma(1, 2, 3, 4, 5)

//ES10

//Array.flat() sube de nivel los arreglos que están dentro de otro areglo
//remueve anidaciones internas en arreglos
const arrayNum = [1, 2, 3, 4, [5, 6, 7, 8, 9, [2, 3, 4, 5]]]
console.log(arrayNum.flat(2)); /// manda el array que esta en nivel 2 a nivel 0
//[1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
console.log(arrayNum.flat(Infinity)); // Infinity pasa todos al mismo nivel 0
///si no se le pasa nada sube cada arreglo de nivel


//Hands on lab
class TickedManager {
    //variable privada
    #precioBasDeGanancia = 2
    constructor() {
        this.eventos = []
    }

    getEventos() {
        return this.eventos
    }

    agregarEvento(nombre, lugar, precio, capacidad=50, fecha = new Date()) {
        // let id;
        // if (!this.eventos.length) {
        //     id=1
        // } else {
        //     id = this.eventos[this.eventos.length-1].id+1
        // }
        //(!this.eventos.length) devuelve true si es vacío y false si tiene elementos
        // si true(vacio) le pone 1, si false(lleno) le pone el siguiente id
        const evento = {
            id: !this.eventos.length
                ? 1
                : this.eventos[this.eventos.length-1].id + 1,
            nombre, 
            lugar, 
            precio: precio + this.#precioBasDeGanancia, 
            capacidad, 
            fecha, 
            participantes: []
        }
        this.eventos.push(evento)
    }
}

const manager1 = new TickedManager()
manager1.agregarEvento('Final mundial', 'Catar', 12000, 50000)
console.log(manager1.getEventos());
manager1.agregarEvento('Final libertqadores', 'Bogota', 12000, 50000)

