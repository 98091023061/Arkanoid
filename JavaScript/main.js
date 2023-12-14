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


Destructuracion();