const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const colorDisplay = document.querySelector("#color-display");
const resetBtn = document.querySelector("#reset-btn");
const messageDisplay = document.querySelector("#message");
const difficultySelector = document.querySelector("select");
const squareContainer = document.querySelector(".square-container");
let scoreDisplay = document.querySelector("#score-value"); 
let squares = document.querySelectorAll(".square");

const defaultBackground = "#12151F";
const primaryAccent = "#9695F0";

const difficultyValue = {
    blind: 2,
    easy: 3,
    medium: 6,
    hard: 15,
    tough: 24,
    giga: 45
};

let colors = [];
let numberOfSquares = 2;
let randomlyPickedColor;
let score = 0;
let flag = false;
let difficultyReset = false;

initialize();
function initialize() {
    setupSquares(numberOfSquares);
}

function generateRandomColors(numberOfColors) {
    const randColors = [];
    for(let i = 0; i < numberOfColors; i++) {
        randColors.push(generateRandomHexColor());
    }
    return randColors;
}

function generateRandomHexColor() {
    return `#${Math.random().toString(16).substring(2, 8)}`;
}

function generateRandomIndex() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
  
function createDiv() {
    let newDiv = document.createElement("div");
    squareContainer.append(newDiv);
    newDiv.classList.add("square");
    squares = document.querySelectorAll(".square");
}
  
function deleteAllDivs() {
    document.querySelectorAll(".square-container div").forEach(div => div.remove());
}

function setupSquares(numberOfSquares) {
    colors = generateRandomColors(numberOfSquares);
    randomlyPickedColor = generateRandomIndex();
    colorDisplay.textContent = randomlyPickedColor;
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.setProperty("--secondary-accent-color", colors[i]);
        squares[i].addEventListener("click", function() {
            const guessedColor = this.style.getPropertyValue("--secondary-accent-color");
            if(guessedColor == randomlyPickedColor) {
                messageDisplay.textContent = "Correct!";
                score++;
                scoreDisplay.textContent = score;
                changeColors(guessedColor);
                h1.style.backgroundColor = guessedColor;
                
                setTimeout(function() {
                    flag = true;
                    reset(flag);
                }, 1000);
            }
            else{
                messageDisplay.textContent = "Incorrect!";
                scoreDisplay.textContent = score;
                for(let i = 0; i < squares.length; i++) {
                    squares[i].style.setProperty("--secondary-accent-color", defaultBackground);
                }
                body.style.backgroundColor = randomlyPickedColor;
                h1.style.backgroundColor = randomlyPickedColor;
                setTimeout(function() {
                    flag = false;
                    reset(flag);
                }, 1000);
            }
        });
    }
}

function reset() {
    body.style.backgroundColor = defaultBackground;
    h1.style.backgroundColor = primaryAccent;
    resetBtn.textContent = "New Colors";
    // messageDisplay.textContent = "";
    h1.style.backgroundColor = primaryAccent;
    if(!flag) {
        score = 0;
        scoreDisplay.textContent = 0;
    }
    if(difficultyReset) {
        messageDisplay.textContent = "";
        score = 0;
        scoreDisplay.textContent = 0;
    }
    colors = generateRandomColors(numberOfSquares);
    randomlyPickedColor = generateRandomIndex();
    colorDisplay.textContent = randomlyPickedColor;
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.setProperty("--secondary-accent-color", colors[i]);
    }
}

function difficultyChange() {
    deleteAllDivs();
    let numberOfDivs = difficultyValue[difficultySelector.value];
    numberOfSquares = numberOfDivs;
    for (let i = 0; i < numberOfDivs; i++) {
        createDiv();
    }
    difficultyReset = true;
    reset(difficultyReset);
    initialize();
}

function changeColors(color) {
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.setProperty("--secondary-accent-color", color);
    }
}

difficultySelector.addEventListener("change", difficultyChange);
resetBtn.addEventListener("click", reset);