let numSquares = 6;
let boxes = document.querySelectorAll(".boxes");
const h1 = document.querySelector("h1");
const status = document.getElementById("status");
const option = document.getElementById("option");
const easy = document.querySelector("#easy");
const hard = document.querySelector("#hard");


const h1Color = "#6cc5f8";


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

function resetColors(){
    if (numSquares === 6){
        h1.style.backgroundColor = h1Color;
        easy.removeAttribute("style");
        hard.removeAttribute("style");
        option.removeAttribute("style");
        easy.classList.remove("selected");
        hard.classList.add("selected");
        status.style.color = "white";
    } else if (numSquares === 3){
        easy.removeAttribute("style");
        hard.removeAttribute("style");
        option.removeAttribute("style");
        h1.style.backgroundColor = h1Color; 
        easy.classList.add("selected");
        hard.classList.remove("selected");
        status.style.color = "white";
    }
} 

function boxEvents(number){
    if (number === 6){
        boxes.forEach(function(box){ !losingColors.includes(box) ? box.style.backgroundColor = winColor : box.style.backgroundColor = "#232323"});
        h1.style.background = winColor;
        status.textContent = " Correct! ";
        option.textContent = "Play Again?";
        status.style.color = winColor;
        option.style.color = winColor;
        easy.style.color = winColor;
        hard.style.backgroundColor = winColor; 
    } else if (number === 3){
        boxes.forEach(function(box){ !losingColors.includes(box) ? box.style.backgroundColor = winColor : box.style.backgroundColor = "#232323"});
        h1.style.background = winColor;
        status.textContent = " Correct! ";
        option.textContent = "Play Again?";
        status.style.color = winColor;
        option.style.color = winColor;
        hard.style.color = winColor;
        easy.style.backgroundColor = winColor; 
    }    
}

function hoverEffect(element){
    element.onmouseover = function(){
        this.style.color = "white";
        this.style.backgroundColor = winColor;
    }
    element.onmouseleave = function(){
        this.style.backgroundColor = "white";
        this.style.color = winColor;
    }

}

option.textContent = "New Colors";
option.addEventListener("click", function(){
    option.textContent = "New Colors";  
    colors = generateRandomColors(6);
    winColor = colors[getRandomInt(0, colors.length-1)];
    updateBoxColors(); 
    [r, g, b] = getRGBValues();
    updateH1Tag();
    resetColors();
    losingColors = []; // once  we click the button we want no colors in our losingColors array       
})


// Changing the h1 to reflect upon the winColor

easy.addEventListener("click", function(){
    easy.classList.add("selected");
    hard.classList.remove("selected");
    h1.style.backgroundColor = h1Color;
    status.textContent = "Try Again!";
    option.textContent = "New Colors";
    status.style.color = "white";   
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    winColor = colors[getRandomInt(0, 2)];
    [r, g, b] = getRGBValues();
    updateH1Tag();
    updateBoxColors();
    resetColors();
})

hard.addEventListener("click", function(){
    hard.classList.add("selected");
    easy.classList.remove("selected");
    h1.style.backgroundColor = h1Color;
    option.textContent = "New Colors";
    status.textContent = "Try Again!";
    status.style.color = "white";       
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    winColor = colors[getRandomInt(0, 5)];
    [r, g, b] = getRGBValues();
    updateH1Tag();
    updateBoxColors();
    resetColors();

})

// events

let losingColors = [];

for(let i=0; i<boxes.length; i++){
    boxes[i].addEventListener("click", function(){
        if (this.style.backgroundColor === winColor){
            boxEvents(numSquares);
            hoverEffect(option);
            hoverEffect(easy);
        }else{
            this.style.backgroundColor = "#232323";
            status.textContent = "Try Again!"
            status.style.color = h1Color;
            losingColors.push(this);
    
}})};