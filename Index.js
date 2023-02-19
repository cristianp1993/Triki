//const PLAYER1 = document.querySelector("playerUno")
//const PLAYER2 = document.querySelector("playerdos")
//reiniciar el triki para jugar nuevamente
const RESETBUTTON = document.querySelector(".reset");
let dialog = document.getElementById("winDialog");
let linesX=[];
let linesO=[];
let valueSet = true;
let counter = 1;

//es la matriz de las lineas de los div ganadoras que tal cual son las clases de los divs
const WINLINES=[
  ["e1","e2","e3"],
  ["e4","e5","e6"],
  ["e7","e8","e9"],
  ["e1","e5","e9"],
  ["e3","e5","e7"],
  ["e1","e4","e7"],
  ["e2","e5","e8"],
  ["e3","e6","e9"]
]

document.getElementById("container").addEventListener("click", UpdateElement);

// La funcion que actualiza la X ó el O en cada Div
function UpdateElement(event) {
  const ELEMENTSELECTED = event.target.id;
  let valueElement =document.querySelector('[id='+ELEMENTSELECTED+']');
  
  //DESHABILITAR EL CLICK EN EL ELEMENTO QUE YA SE LLENO
  let existText = DisabledClickElement(event.target.id)
  //console.log(existText);
  if(valueSet && !existText){

    setValueLine(JSON.parse('{"'+ String(ELEMENTSELECTED) +'":"X"}'));    
    valueElement.innerHTML ="X";
    valueSet=false;
    counter =counter+1

  }else if (!valueSet && !existText){

    setValueLine(JSON.parse('{"'+ String(ELEMENTSELECTED) +'":"O"}'));    
    valueElement.innerHTML ="O";
    valueSet=true;
    counter =counter+1
  }
  
}

function DisabledClickElement(element){
  const myDiv = document.getElementById(element)
  if (myDiv.innerHTML !="") {
    return true
  }else{
    return false
  }
}



const DATATRIKI = Array.prototype.slice.call(document.getElementsByClassName("grid-item"), 0)

//Funcion que al presionar en el boton reset limpia todos los DIV para iniciar un nuevo juego
RESETBUTTON.addEventListener('click',
  ()=>{ 
    //console.log(dataTriki)
    valueSet = true;
    linesX=[];
    linesO=[];
    resetTable();
  })

function resetTable(){
  for(element of DATATRIKI){
    //console.log(element);
    element.innerHTML= ""
  }  
  linesX=[];
  linesO=[]; 
} 

//agrega el valor clickeado del trik al arreglo
function setValueLine(value){

  let valueTemp =JSON.stringify(value);
  const regex =/X\b/
  console.log(counter)
  //console.log(valueTemp);
  if(regex.test(valueTemp)){
    
    linesX.push(value);
    if(linesX.length >= 3)
        validateLineWin("X");
  }
  else{
    linesO.push(value);
    if(linesO.length >= 3)
         validateLineWin("O");
  }


}

//se validara si la linea es una linea ganadora
function validateLineWin(letter){  
  
  let lines =[];
  let KeyString="";
  let valueToCompare ="";
  let split=[];
  let arrayToCompare=[]
  let arrayFin=[];
 
  //verificamos que letter es la presionada para saber que Array se elige
  if (letter =="X")
    lines = linesX
  else
    lines = linesO
  
  //obtenemos las llaves de los divs presionados para posteriormente compararlos con las lineas ganadoras
  lines.forEach((element) => {
    const keys = Object.keys(element)
    KeyString = KeyString +","+String(keys[0]);
    //console.log(KeyString.substring(1))
    valueToCompare =KeyString.substring(1);
  })
  //La cadena que toma las llaves de los div Clickeados lo convertimos en un array para comparar con el array de lineas
  //ganadoras
  split = valueToCompare.split(",");
  split.forEach(element => arrayToCompare.push(element))

  //console.log("Array Para comparar:");
  //console.log(arrayToCompare);

  //Recorremos el array de lineas ganadoras y buscamos si el arrayToCompare si contiene alguna linea ganadora
  let thereWinner = false
  for (const value of WINLINES) {
    //comparamos qe lo que hay en ArraytoCompare que es X ó O sea igual a lo que hay en las lineas ganadoras
    arrayFin = Array.from(new Set([...value].filter(elem=> new Set(arrayToCompare).has(elem))))
    
    if(arrayFin.length==3){
      //console.log("Alguien gano el juego");
      //console.log(arrayFin)
      thereWinner = true;
      
      break;
    }
  }
 
  if (thereWinner){
    showWinner(letter)
  }
  else if(!thereWinner && counter == 9){
    
    showWinner("E")
  }
  
}

function showWinner(letter){
 
  //console.log(`Ganan las : ${letter}`);
  let msj = document.getElementById("msjGanador")
  if(letter != "E"){

    msj.innerHTML = `${letter} WIN `
  }
  else{

    msj.innerHTML = "DRAW"
  }
  counter=0
  valueSet = true
  dialog.showModal();
    
}

const BUTTONCLOSEDIALOG = document.getElementById("closeDialog")

BUTTONCLOSEDIALOG.addEventListener('click',()=>{
  dialog.close()
  resetTable();
  valueSet = true
})