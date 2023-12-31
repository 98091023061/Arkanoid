function TryCatch(){

    try {
        console.log("En el try se agrega el codigo a evaluar");
        noExiste;
    }catch(error){
        // console.log("Catch captura los errores del try")
        console.log(error)
    }finally{
        console.log("El bloque finally se ejecuta al final de un bloque try catch");
    }
}


// TryCatch();

function try2(){
    try{
        let numero = "a";
        if(isNaN(numero)){
            throw new Error("El caracter introducido no es un numero");
        }
        console.log(numero * numero);
    }catch(error){
        console.log("Se produjo el siguiente error "+ error);
    }

}

// try2();

function Destructuracion(){

    const numeros = [1,2,3];
    // sin destructuracion
    let uno = numeros[0];
    let dos = numeros[1];
    let tres= numeros[2];
    
    // con destructuracion
    
    const[one,two,three] = numeros;
    
    console.log(one,two,three);
    
    
    let persona = {
        nombre:"Joel",
        apellido:"Matos",
        edad:25
    }
    
    let{apellido,nombre,edad} = persona;
    // El orden en el que asigna no importa pq coge el nombre de la 
    // variable

    console.log(nombre,apellido,edad);

}


// Destructuracion();

function objetosLiterales(){
    nombre = "Joel";    
    edad = 25;  
    const perro = {
        nombre: nombre,
        edad: edad,
        ladrar:function(){
            console.log("guauu Guauu!!");
        }
    }
console.log(perro);
perro.ladrar();

const dog = {
    nombre,
    edad,
    raza:"Callejero",
    ladrar(){
        console.log("guauu Guauu Guauu!!");
    }
}

console.log(dog);
dog.ladrar();
}

// objetosLiterales();

function ParametroRestSpread(){

    function sumar (a,b,...c){
        let resultado = a +b;
        c.forEach(function(n){
            resultado+=n;
        });

        return resultado;
    }
    console.log(sumar(1,2));
    console.log(sumar(1,2,3,4,5));
    console.log(sumar(1,2,3,4,5,6,7));

    const arr1 = [1,2,3,4,5];
    const arr2 = [6,7,8,9,0];

    console.log(arr1,arr2);
    // Spread Operator
    const arr3 = [...arr1,...arr2];

    console.log(arr3);

}

// ParametroRestSpread();


function ArrowFunctions(){
    
    const saludo = nombre => console.log("Hola "+ nombre);

    saludo("Joel");

    // const sumar = function (a,b){
    //     return a+b;
    // }

    const sumar = (a , b) => a+b;

    console.log(sumar(8,9));

    const numeros = [1,2,3,4,5];

    numeros.forEach((el,index)=> console.log(el+' esta en la posicion '+index));


    function Perro (){
        console.log(this);
    }
    // Perro();

    const perro ={
        nombre:"Joel",
        ladrar:function(){
            console.log(this);
        },

        ladrarArrow: ()=>{
            console.log(this);
        }
    }

    perro.ladrar(); 
    perro.ladrarArrow(); 
    
    
}

// ArrowFunctions();

function Prototipos(){
// POO
/*
Clases-Modelo a seguir
Objetos-Es una instancia de una clase
    Atributos - es una caracteristica o propiedad del objeto(variables dentro de un objeto)
    Metodos - Acciones que un objeto puede realizar (funciones dentro de un objeto)
*/

// const animal = {
//     nombre:"snoopy",
//     sonar(){
//         console.log("Hago sonidos porque estoy vivo");
//     }
// }
// console.log(animal);

// Generando prototipos

// Funcion constructora

// function Animal(nombre , genero){
// //  Atributos
//     this.nombre = nombre;
//     this.genero = genero;
// // Metodos
//     this.sonar = function(){
//         console.log("Hago sonidos porque estoy vivo");
//     }
//     this.saludar = function(){
//         console.log('Hola me llamo ' + this.nombre);
//     }
// }

// Funcion constructora donde asignamos metodos a prototipos
function Animal(nombre , genero){
    //  Atributos
        this.nombre = nombre;
        this.genero = genero;
    }
// Metodos agregados al prototipo de la funcion constructora
Animal.prototype.sonar = function(){
    console.log("Hago sonidos porque estoy vivo");
}
Animal.prototype.saludar = function(){
    console.log('Hola me llamo ' + this.nombre);
}
    
const snoopy = new Animal("Snoopy","Macho"),
lolaBunny = new Animal("Lola Bunny","Hembra");

console.log(snoopy);
snoopy.saludar();
console.log(lolaBunny);
}
Prototipos();


