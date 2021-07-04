const body = document.querySelector("body");                                // get the body element 
const h1 = document.querySelector("h1");                                    // get the h1 element 
const colorDisplay = document.querySelector("#color-display");              // get the span placeholder to display HEX color to guess 
const resetBtn = document.querySelector("#reset-btn");                      // get the button to reset and generate new colors 
const messageDisplay = document.querySelector("#message");                  // get the span placeholder to display message about game state
const difficultySelector = document.querySelector("select");                // get the select element to choose difficulty   
const squareContainer = document.querySelector(".square-container");        // get the div element container for squares       
let scoreDisplay = document.querySelector("#score-value");                  // get the span placeholder to update the score and display
let squares = document.querySelectorAll(".square");                         // get the node list of each div containing class name "square"

const defaultBackground = "#12151F";        // get default background color    
const primaryAccent = "#9695F0";            // get primary accent color

const difficultyValue = {
    // object to map the number of squares to assign to each difficulty level
    blind: 2,
    easy: 3,
    medium: 6,
    hard: 15,
    tough: 24,
    inhuman: 45
};

let colors = [];                    // array to store randomly generated hex color values
let numberOfSquares = 2;            // storing the number of squares per difficulty
let randomlyPickedColor;            // storing the randomly generated index from colors[] array
let score = 0;                      // keeping track of game's score
let flag = false;                   // score flag to determine weather to reset the score or not 
let difficultyReset = false;        // difficulty reset flag in order to clear out message and score state    

initialize();                           // initialize function is called every time page is refreshed
function initialize() {
    // to initialize game 
    setupSquares(numberOfSquares);      // calls and sets up the colors & logic of game
}

function generateRandomColors(numberOfColors) {
    // generates random hex values n times, provided as parameter - numberOfColors
    const randColors = [];                              // creating temp array to store random colors      
    for(let i = 0; i < numberOfColors; i++) {           
        randColors.push(generateRandomHexColor());      // pushing randomly generated color to next array index    
    }
    return randColors;                                  // returns the array populated with random colors
}

function generateRandomHexColor() {
    // generates a random hex color value and returns as string format "#rrggbb"
    return `#${Math.random().toString(16).substring(2, 8)}`;
}

function generateRandomIndex() {
    // generates a random index from the colors[] array to be displayed as color to guess in order to win the game
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];         // returns color on randomly generated index
}
  
function createDiv() {
    // creates a new div element on page if the difficulty is changed and it requires more squares
    let newDiv = document.createElement("div");             // creating div element
    squareContainer.append(newDiv);                         // appending the div to end of square container children
    newDiv.classList.add("square");                         // assing "square" class to created div element
    squares = document.querySelectorAll(".square");         // updating the squares variable to store new div as well
}
  
function deleteAllDivs() {
    // deletes all the divs from body if the difficulty is changed
    document.querySelectorAll(".square-container div").forEach(div => div.remove());
}

function setupSquares(numberOfSquares) {
    // sets up squares and game logic for winning or losing
    // generating random colors and index
    colors = generateRandomColors(numberOfSquares);
    randomlyPickedColor = generateRandomIndex();
    colorDisplay.textContent = randomlyPickedColor;
    for(let i = 0; i < squares.length; i++) {
        // iterating through each square and giving it random color from array
        squares[i].style.setProperty("--secondary-accent-color", colors[i]);
        squares[i].addEventListener("click", function() {
            // everytime a square is clicked, the logic applies
            const guessedColor = this.style.getPropertyValue("--secondary-accent-color");       // get the guessed color
            if(guessedColor == randomlyPickedColor) {           // check if guessed color is same as random index
                messageDisplay.textContent = "Correct!";            // then display correct message
                score++;                                            // update the score
                scoreDisplay.textContent = score;                   // display the updated score    
                changeColors(guessedColor);                         // change all square's colors to winning color
                h1.style.backgroundColor = guessedColor;            // change h1 background to winning color 
                setTimeout(function() {
                    // timeout calling reset function for 1second so that all the message above are displayed in time
                    flag = true;
                    reset(flag);
                }, 1000);
            }
            else{                                                   // ohterwise
                messageDisplay.textContent = "Incorrect!";              // display incorrect message
                scoreDisplay.textContent = score;                       // display the score
                for(let i = 0; i < squares.length; i++) {
                    // changing color of all squares to default background color
                    squares[i].style.setProperty("--secondary-accent-color", defaultBackground);
                }
                body.style.backgroundColor = randomlyPickedColor;       // changing body's color to winning color
                h1.style.backgroundColor = randomlyPickedColor;         // changing h1's background color to winning color
                setTimeout(function() {
                    // timeout calling reset function for 1second so that all the message above are displayed in time
                    flag = false;
                    reset(flag);
                }, 1000);
            }
        });
    }
}

function reset() {
    // resets the game if the game is lost or difficulty is changed or new colors are requested
    body.style.backgroundColor = defaultBackground;                                 // reset background color of page
    h1.style.backgroundColor = primaryAccent;                                       // reset h1 color    
    resetBtn.textContent = "New Colors";                                            // reset button content
    if(!flag) {
        // if the reset function is called with flag it will reset the score otherwise not
        score = 0;
        scoreDisplay.textContent = 0;
    }
    if(difficultyReset) {
        // if the reset function is called with difficulty reset flag then it will reset everytime difficulty is changed
        messageDisplay.textContent = "";
        score = 0;
        scoreDisplay.textContent = 0;
        difficultyReset = false;
    }
    colors = generateRandomColors(numberOfSquares);                                 // regenerating the random colors
    randomlyPickedColor = generateRandomIndex();                                    // regenerating the random index
    colorDisplay.textContent = randomlyPickedColor;                                 // displayed color to guess    
    for(let i = 0; i < squares.length; i++) {           
        // giving each square a random color
        squares[i].style.setProperty("--secondary-accent-color", colors[i]);
    }
}

function difficultyChange() {
    // changes difficulty of the game and resets the game
    deleteAllDivs();                                                    // deletes all squares 
    let numberOfDivs = difficultyValue[difficultySelector.value];       // new amount of squares are created based on select value
    numberOfSquares = numberOfDivs;
    for (let i = 0; i < numberOfDivs; i++) {
        // creating new squares - number of times
        createDiv();
    }
    difficultyReset = true;         // changes difficultyReset flag to true 
    reset(difficultyReset);         // reset the game with difficultyReset flag    
    initialize();                   // setup game from the start
}

function changeColors(color) {
    // changes colors of squares if game is won
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.setProperty("--secondary-accent-color", color);
    }
}

difficultySelector.addEventListener("change", difficultyChange);            // changes difficulty everytime select value is changed
resetBtn.addEventListener("click", reset);                                  // makes call to reset function everytime new colors button is clicked