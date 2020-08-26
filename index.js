let numSquares = 6;
let boxes = document.querySelectorAll(".boxes");
const h1 = document.querySelector("h1");
const status = document.getElementById("status");
const option = document.getElementById("option");
const easy = document.querySelector("#easy");
const hard = document.querySelector("#hard");
const theme = document.querySelector("#theme");
const body = document.querySelector("body");
let themeCount = 0; // this counter will let us know if we are in light or dark mode.

const h1Color = "#6cc5f8";
const darkTheme = "#232323";
const lightTheme = "#e0dddd";


var colors = generateRandomColors(numSquares); // initializes random color boxes based on random rgb values
var winColor = colors[getRandomInt(0, colors.length-1)]; // random color selected from colors array
updateBoxColors();
let [r, g, b] = getRGBValues();

function getRGBValues(){
    let [r, g, b] = winColor.split(", ");
    r = r.slice(4, );
    b = b.slice(0, -1);
    return [r, g, b];
}


function updateH1Tag(){
    h1.innerHTML = `The Great
                    <br>
                    <span id="winColor">RGB(<span id="red">${r}</span>, <span id="green">${g}</span>, <span id="blue">${b}</span>)</span>
                    <br>
                    Color Game`;
}

updateH1Tag();

function generateRandomColors(length){
    let randomColors = [];
    for(let i=0; i<length; i++){
        randomColors.push(getRandomColor());
    }
    return randomColors;
}

function updateBoxColors(){
    for(let i=0; i<boxes.length; i++){
        if (i < numSquares){
        boxes[i].style.display = "block"; // we want every box to have display block if numSquares = 6
        boxes[i].style.backgroundColor = colors[i]
        } else {
            boxes[i].style.display = "none"; // this block of code would only run if numSquares = 3 (easy mode).
        }
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


function clearBoxes(){
    if (themeCount % 2 === 0){
        boxes.forEach(function(box){ !losingColors.includes(box) ? box.style.backgroundColor = winColor : box.style.backgroundColor = darkTheme});
    } else {
        boxes.forEach(function(box){ !losingColors.includes(box) ? box.style.backgroundColor = winColor : box.style.backgroundColor = lightTheme});
    }
}

function boxEvents(number){
    clearBoxes();
    h1.style.backgroundColor = winColor;
    status.textContent = " Correct! ";
    option.textContent = "Play Again?";       
}


option.textContent = "New Colors";
option.addEventListener("click", function(){
    option.textContent = "New Colors";
    status.textContent = "Guess the color";
    status.style.color = h1Color; 
    h1.style.backgroundColor = h1Color;
    colors = generateRandomColors(6);
    winColor = colors[getRandomInt(0, colors.length-1)];
    updateBoxColors(); 
    [r, g, b] = getRGBValues();
    updateH1Tag();
    losingColors = []; // once  we click the button we want no colors in our losingColors array       
})


// Changing the h1 to reflect upon the winColor

easy.addEventListener("click", function(){
    easy.classList.add("selected");
    hard.classList.remove("selected");
    h1.style.backgroundColor = h1Color;
    status.textContent = "Guess the color";
    option.textContent = "New Colors";
    status.style.color = h1Color;   
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    winColor = colors[getRandomInt(0, 2)];
    [r, g, b] = getRGBValues();
    updateH1Tag();
    updateBoxColors();
    losingColors = [];
})

hard.addEventListener("click", function(){
    hard.classList.add("selected");
    easy.classList.remove("selected");
    h1.style.backgroundColor = h1Color;
    option.textContent = "New Colors";
    status.textContent = "Guess the color";
    status.style.color = h1Color;       
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    winColor = colors[getRandomInt(0, 5)];
    [r, g, b] = getRGBValues();
    updateH1Tag();
    updateBoxColors();
    losingColors = [];
})

theme.addEventListener("click", function(){
    themeCount++;
    if (themeCount % 2 === 0){
        theme.textContent = "Light Theme";
        boxes.forEach(function(box){
            if(losingColors.includes(box)){
                box.style.backgroundColor = darkTheme;
            } else {}
        })
    } else {
        theme.textContent = "Dark Theme";
        boxes.forEach(function(box){
            if(losingColors.includes(box)){
                box.style.backgroundColor = lightTheme;
            } else {}
        })
    }body.classList.toggle("theme");
})

let losingColors = [];

for(let j=0; j<boxes.length; j++){
    boxes[j].addEventListener("click", function(){
        if (this.style.backgroundColor === winColor){
            boxEvents(numSquares);
        }else{
            if (themeCount % 2 === 0){
                this.style.backgroundColor = darkTheme;
            } else {
                this.style.backgroundColor = lightTheme;
            }
            status.textContent = "Try Again!"
            status.style.color = h1Color;
            losingColors.push(this);
}})};