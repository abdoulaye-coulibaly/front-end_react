document.addEventListener('DOMContentLoaded', () => {
    
    const classes = {
    outerGlow:"drop-shadow-[0_0px_4px_rgba(48,128,255,1)]",
    on:"bg-[#3080FF]",
    off:"bg-gray-900"
}

const orderTable = {
    "0":[0,1,2,4,5,6],
    "1":[2,5],
    "2":[0,2,3,4,6],
    "3":[0,2,3,5,6],
    "4":[1,2,3,5],
    "5":[0,1,3,5,6],
    "6":[0,1,3,4,5,6],
    "7":[0,2,5],
    "8":[0,1,2,3,4,5,6],
    "9":[0,1,2,3,5,6]
}

const h1Cells = getCells(document.querySelector('.digit-h-1'));
const h2Cells = getCells(document.querySelector('.digit-h-2'));
const m1Cells = getCells(document.querySelector('.digit-m-1'));
const m2Cells = getCells(document.querySelector('.digit-m-2'));



function getCells(parent){
    let cells = [
        parent.children[0],
        parent.children[1].children[0],
        parent.children[1].children[1],
        parent.children[2],
        parent.children[3].children[0],
        parent.children[3].children[1],
        parent.children[4]
    ];
    return cells; 
}


function setHours(number){
    const digits = to2Digits(number);
    setDigit(h1Cells,digits[0]);
    setDigit(h2Cells,digits[1]);
}

function setMinutes(number){
    const digits = to2Digits(number);
    setDigit(m1Cells,digits[0]);
    setDigit(m2Cells,digits[1]);
}

function to2Digits(number){
    return number.toString().padStart(2,0);
}

function setDigit(cells,number){
    const order = orderTable[number];
    for(let i =0;i<cells.length;i++){
        turnCell(cells[i],order.includes(i));
    }
}

function turnCell(cell,on){
    if(on){
        cell.children[0].classList.remove(classes.off);
        cell.children[0].classList.add(classes.on);
        cell.classList.add(classes.outerGlow);
    }else{
        cell.children[0].classList.remove(classes.on);
        cell.children[0].classList.add(classes.off);
        cell.classList.remove(classes.outerGlow);
    }
}

let prev = {
    h:null,
    m:null
}
setInterval(function(){
    const date = new Date();
    if(prev.h !== date.getHours()){
        prev.h = date.getHours();
        setHours(date.getHours());
    }
    if(prev.m !== date.getMinutes()){
        prev.m = date.getMinutes();
        setMinutes(date.getMinutes());
    }
},300)
});