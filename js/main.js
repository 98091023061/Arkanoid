
var c = document.getElementById("arkanoidCanva");
var ctx = c.getContext("2d");
// Inicializacion de variables
var radius = 10;
var x = c.width / 2;
var y = c.height - 70;
var dx = -4 ;
var dy = -4;
var blockMap = [];
var mouseX = 0;
var speed = 25;
var blockCount = 25;
var audioBar = new Audio('./files/SpeechOn.wav');
var audioBlock = new Audio('./files/chord.wav');


// Funcion para incializar el mapa de valores 
function cleanMap(){
    for (let i = 0 ; i <= c.height + 100 ; i++){
        blockMap[i] = [];
        for(let j = 0 ; j <= c.width  + 100 ; j++){
            blockMap[i][j] = 20;
        }
    }
}
// tracker de la posicion del mouse
document.addEventListener("mousemove", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
// valores limites de la variable que contiene la posicion x del mouse
    if (mouseX > 590) mouseX = 590;
    if (mouseX < 60) mouseX = 60;
    updateBar();

  });

// listener para el clic del mouse en el boton de reset
document.addEventListener("click",function(event){
    if(mouseX>=275 && mouseX <= 325 && mouseY >= 175 && mouseY <= 225){
    // inicializacion de variables para nueva instancia del juego
        speed = 25;
        blockCount = 25;
        cleanMap();
        clearInterval(interval);
        x = c.width / 2;
        y = c.height - 70;
        dx = -4 ;
        dy = -4;
        interval = setInterval(draw,speed);
    }
});
function win (){
    ctx.clearRect(0,0,c.width,c.height);
    clearInterval(interval);
    let imagen = new Image();
    imagen.src = "./files/Restart.jfif";
    imagen.onload = function() {
        ctx.drawImage(imagen, 275, 175, 50, 50);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
      
        ctx.fillText('Congrats , you win', 180, 280);
    }

    if(mouseX>=275 && mouseX <= 325 && mouseY >= 175 && mouseY <= 225){
        // inicializacion de variables para nueva instancia del juego
            speed = 25;
            blockCount = 25;
            cleanMap();
            clearInterval(interval);
            x = c.width / 2;
            y = c.height - 70;
            dx = -4 ;
            dy = -4;
            interval = setInterval(draw,speed);
    }


}

// actualizacion en el mapa de la posicion de la barra controlada por mouse
function updateBar(){
    // ciclo para rellenar los espacios donde se encuentra la barra
    for ( let i =-50; i<= 50 ; i++){
        blockMap[360][mouseX+i] = Math.round(i/10);
        
    }
    // ciclo para rellenar los espacios donde no se encuentra la barra
    for(let i = 0 ; i<= 650 ; i++){
        if (i>= mouseX -50 && i <=  mouseX +50)continue;
        blockMap[360][i] = 20;
    }
    
}
// funcion para dibujar la barra
function drawBar(){
    ctx.fillStyle = "green";

    ctx.fillRect(mouseX-50+radius, 360, 90 - radius, 5);

}
// funcion paroa chequear si la bola choca con la barra y establecer nueva direccion
function checkBar(){

    let nextPos = blockMap[y + dy+ radius][x];
    if(nextPos >= -5 && nextPos <= 5 ){

        audioBar.pause();
        audioBar.currentTime = 0;
        audioBar.play();
        dy = -dy;
        dx = nextPos;
    }
}

// funcion para dibujar la bola
function drawBall (){
    ctx.beginPath();
    ctx.arc(x , y , radius , 0, 2 * Math.PI);
    ctx.fillStyle = "#663300";
    ctx.fill();
    ctx.closePath();
}
// funcion para cambiar el intervalo de visualizacion del juego con cada bloque que golpee la bola
function changeInterval(){
    speed-=1;
    clearInterval(interval);
    interval = setInterval(draw, speed);
}
// funcion para dibujar todos los componentes del juego
function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    blocks();
    drawBar();
    drawBall();
    if (!blockCount){
        win();
    }

    if (x + dx >= c.width - radius || x + dx <= radius){
        dx = -dx;
    }
    
    if (y + dy >= c.height - radius || y + dy <= radius){
        dy = -dy;
    }

    if (blockMap[y + dy+ radius][x][0] > 10){
        
        [delX,delY,delEndX,delEndY] = blockMap[y + dy+ radius][x];
        dy = -dy;
        fillMap(delX,delY,delEndX,delEndY,false);
        changeInterval();
        
        audioBlock.pause();
        audioBlock.currentTime = 0;
        audioBlock.play();
        blockCount--;
        ctx.clearRect(delX,delY,delEndX - delX,delEndY - delY);
    }

    else if (blockMap[y + dy- radius][x][0] > 10){
        
        [delX,delY,delEndX,delEndY] = blockMap[y + dy- radius][x];
        dy = -dy;
        fillMap(delX,delY,delEndX,delEndY,false);
        changeInterval();

        audioBlock.pause();
        audioBlock.currentTime = 0;
        audioBlock.play();
        blockCount--;
        ctx.clearRect(delX,delY,delEndX - delX,delEndY - delY);
    }

    else if (blockMap[y][x + dx- radius][0] > 10){
        if (!dx){
            dy =-dy;
        }

        [delX,delY,delEndX,delEndY] = blockMap[y][x + dx- radius];
        dx = -dx;
        fillMap(delX,delY,delEndX,delEndY,false);
        changeInterval();

        audioBlock.pause();
        audioBlock.currentTime = 0;
        audioBlock.play();
        blockCount--;
        ctx.clearRect(delX,delY,delEndX - delX,delEndY - delY);
    }

    else if (blockMap[y][x + dx+ radius][0] > 10){
        
        if (!dx){
            dy =-dy;
        }
        blockCount--;
        [delX,delY,delEndX,delEndY] = blockMap[y][x + dx+ radius];
        dx = -dx;
        fillMap(delX,delY,delEndX,delEndY,false);
        changeInterval();

        audioBlock.pause();
        audioBlock.currentTime = 0;
        audioBlock.play();
        ctx.clearRect(delX,delY,delEndX - delX,delEndY - delY);
    }
    if (y + dy + radius == 360){
        checkBar();
    }

    if (y + dy  > 380){
        ctx.clearRect(0,0,c.width,c.height);
        clearInterval(interval);
        let imagen = new Image();
        imagen.src = "./files/Restart.jfif";
        imagen.onload = function() {
            ctx.drawImage(imagen, 275, 175, 50, 50);
            ctx.font = '30px Arial';
            ctx.fillStyle = 'black';
          
            ctx.fillText('You Lose , Sucker', 180, 280);
          };
    }
        
    
    x+= dx;
    y+= dy;
}
// funcion para dibujar los bloques
function blocks (){

    for (let rectX = 50 ; rectX <= c.width - 20 ; rectX+= 110){
        if (rectX + 110 >= c.width - 20) continue;
        
        for (let rectY = 50 ; rectY <= c.height/2 ; rectY += 32){

            if (blockMap[rectY][rectX] == -10)continue;
            fillMap(rectX,rectY,rectX + 100 ,rectY + 20,  true);
            
            ctx.fillStyle = "green";
            ctx.fillRect(rectX, rectY, 100, 20);
            }
        }
    }

// funcion para llenar el mapa de los valores que se le pasan de parametros
function fillMap (x,y,xEnd,yEnd,fill) {
    

    for (let i = x ; i<= xEnd;i ++){
        for(let j = y ; j <= yEnd ; j++){
            if (fill)
                blockMap[j][i] = [x,y,xEnd,yEnd];
            else 
                blockMap[j][i] = -10;
        }
    }
}
cleanMap();
var interval = setInterval(draw,speed);