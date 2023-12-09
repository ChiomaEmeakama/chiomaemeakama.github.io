//Student Name: Chioma Emeakama 
//Student ID: 2221006

//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-btn");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for button
let options = {
    names: ["Alfredo", "Gabriella", "Rehman", "Ningxin", "Esperance", "Danial", "Chioma", "Emeakama", "Murekatete", "Zheng", "Basharat", "Franco", "Behzad", "Pariera", "Arnedo", "Silva", "Goodness",],
    colors: ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "black", "gray", "white",],
    htmlTags: ["html", "br", "head", "header", "body", "style", "script", "footer",],
};

//count
let winCount = 0;
let count = 0;
let chosenWord = "";

//Display option buttons
const displayOptions = () =>{
    optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
};

//Block all the buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    //disable all options
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });
    
    //disable all letters
    letterButtons.forEach((button) => {
        button.disabled = true;
    })
    newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord=(optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");

//If optionValue matches the button, innerText then highlights the button
optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue){
        button.classList.add("active");
    }
    button.disabled = true;
});

    //initially hide letters, clear previous word
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];

    //choose random word
    chosenWord = optionArray[Math.floor(Math.random () * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    //Here, we replace each letter with a span containing stars
    let displayItem = chosenWord.replace(/./g, '<span class = "stars">*</span>')

    //To display each element as span:
    userInputSection.innerHTML = displayItem;

};


//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
    winCount = 0;
    count = 0;

    //First  erase every content and hide the letters and the newgame button;
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = ""; 

    letterContainer.classList.add("hide");
    newGameContainer.classList .add("hide");
    letterContainer.innerHTML = "";

    //for creating letter buttons
    for(let i = 65; i < 91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII [A-Z]
        button.innerText = String.fromCharCode(i);
        letterContainer.append(button);                          //(Check if this persists!)

        //button click character
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let stars = document.getElementsByClassName("stars");
            
            //if the array contains clicked value, replace the matched 
            //dash with letter, else draw on the canvas
            if (charArray.includes(button.innerText)){
                charArray.forEach((char, index) => {
                    //if character in array is the same as the clicked button,
                    if(char === button.innerText){

                        //replace the stars with letters
                        stars[index].innerText = char;
                        //increment counter:
                        winCount += 1;
                        //if winCount equals word length, then:
                        if (winCount == charArray.length){
                            resultText.innerHTML = alert("You WIN!!!")    //"<h2 class = 'win-msg'>You Win!!!</h2><p>The word was <span>${chosenWord}</span></p>";
                            //To block all buttons
                            blocker();
                        } 
                    }
                });
            }else{
                //lose count
                count += 1;
                //hangman drawing
                drawMan(count);
                //Count==6 -> for each part of the body;
                
                console.log(count);
                if(count == 6){
                    resultText.innerHTML =  alert("You LOSE!")    //"<h2 class = 'lose-msg'>You Lose! :( </h2><p>The word was <span>${chosenWord}</span></p>";
                    blocker();
                }
            }
            //disable clicked buttons
            button.disabled = true;
        })
    }
    displayOptions();           

    //call to canvasCreator to clear previous canvas & create initial canvas
    let {initialDrawing} = canvasCreator();
    //initialDrawing will draw the frame
    initialDrawing();
};

// Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    //For drawing the lines;
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame
    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //bottom line
        drawLine(10, 130, 130, 130);
        //left line
        drawLine(10, 10, 10, 131);
        //top line
        drawLine(10, 10, 70, 10);
        //small top line
        drawLine(70, 10, 70, 20)
    };

    return {initialDrawing, head, body, leftArm,rightArm,leftLeg, rightLeg}
};
//drawing the man
const drawMan = (count) => {
    let {head, body, leftArm, rightArm, leftLeg, rightLeg} = canvasCreator();
    switch (count){
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break   ;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            leftLeg();
            break;
        default:
            break;

    }
}

//New Game
newGameButton.addEventListener("click",initializer);
window.onload = initializer;