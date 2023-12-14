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

try2();