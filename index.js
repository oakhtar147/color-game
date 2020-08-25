let boxes = document.querySelectorAll(".boxes");
const h1 = document.querySelector("h1");
const status = document.getElementById("status");
const option = document.getElementById("option");
const easy = document.querySelector("#easy");
const hard = document.querySelector("#hard");


var colors = generateRandomColors(6); // initializes random color boxes based on random rgb values
var winColor = colors[getRandomInt(0, colors.length-1)]; // random color selected from colors array
updateBoxColors();


function generateRandomColors(length){
    let randomColors = [];
    for(let i=0; i<length; i++){
        randomColors.push(getRandomColor());
    }
    return randomColors;
}

function updateBoxColors(){
    for(let i=0; i<boxes.length; i++){
        boxes[i].style.backgroundColor = colors[i]
    }       
}

function getRandomColor(){
    return `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;
}                

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum and the minimum are inclusive
}    

option.textContent = "New Colors";
option.addEventListener("click", function(){
    option.textContent = "New Colors";  
    colors = generateRandomColors(6);
    winColor = colors[getRandomInt(0, colors.length-1)];
    updateBoxColors();  
    h1.innerHTML = `The Great <span>${winColor}</span> Color Game!`;
    h1.style.backgroundColor = "#232323"; 
    status.textContent = "";   
    losingColors = []; // once we click the button we want no colors in our losingColors array       
})


// Changing the h1 to reflect upon the winColor
h1.innerHTML = `The Great <span>${winColor}</span> Color Game!`; // span used to apply css properties easily


// events

let losingColors = [];

for(let i=0; i<boxes.length; i++){
    boxes[i].addEventListener("click", function(){
        if (this.style.backgroundColor === winColor){
            boxes.forEach(function(box){ !losingColors.includes(box) ? box.style.backgroundColor = winColor : box.style.backgroundColor = "#232323"});
            h1.style.background = winColor;
            status.textContent = "Correct!";
            option.textContent = "Play Again?";
        }else{
            this.style.backgroundColor = "#232323";
            status.textContent = "Try Again!"
            losingColors.push(this);
    
}})};
