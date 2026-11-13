var squares = document.querySelectorAll(".square");

var colorDisplay = document.querySelector("#colorDisplay");

var messageDisplay = document.querySelector("#message");

var h1 = document.querySelector("h1");

var resetButton = document.querySelector("#reset");

var modeButtons = document.querySelectorAll(".mode");

var colors;

var pickedColor;

var numberOfSquares = 6;

var bodyColor = "#232323";

var defaultHeaderColor = "#2c8e99";

function pickColor() {

    var random = Math.floor(Math.random() * colors.length);

    return colors[random];

}

function randomColor() {

    var r = Math.floor(Math.random() * 256);

    var g = Math.floor(Math.random() * 256);

    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";

}

function generateRandomColors(num) {

    var arr = [];

    for (var i = 0; i < num; i++) {

        arr.push(randomColor());

    }

    return arr;

}

function changeColors(color) {

    for (var i = 0; i < squares.length; i++) {

        squares[i].style.backgroundColor = color;

        squares[i].style.opacity = "1";

    }

}

function reset() {

    colors = generateRandomColors(numberOfSquares);

    pickedColor = pickColor();

    colorDisplay.textContent = pickedColor;

    messageDisplay.textContent = "";

    resetButton.textContent = "Nuevos Colores";

    h1.style.backgroundColor = defaultHeaderColor;

    for (var i = 0; i < squares.length; i++) {

        if (colors[i]) {

            squares[i].style.display = "block";

            squares[i].style.backgroundColor = colors[i];

            squares[i].style.opacity = "1";

            squares[i].style.pointerEvents = "auto";

        } else {

            squares[i].style.display = "none";

        }

    }

    console.log("Cantidad de colores:", colors.length);

}

function setupSquares() {

    for (var i = 0; i < squares.length; i++) {

        squares[i].addEventListener("click", function() {

            var clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {

                messageDisplay.textContent = "¡Correcto!";

                resetButton.textContent = "Play Again?";

                h1.style.backgroundColor = pickedColor;

                changeColors(pickedColor);

            } else {

                messageDisplay.textContent = "Intentalo nuevamente";

                this.style.backgroundColor = bodyColor;

                this.style.opacity = "0";

                this.style.pointerEvents = "none";

            }

        });

    }

}
function setupModeButtons() {

    for (var i = 0; i < modeButtons.length; i++) {

        modeButtons[i].addEventListener("click", function() {

            for (var j = 0; j < modeButtons.length; j++) {

                modeButtons[j].classList.remove("selected");

            }

            this.classList.add("selected");

            numberOfSquares = this.textContent.trim() === "Easy" ? 3 : 6;

            reset();

        });

    }

}

function setupResetButton() {

    resetButton.addEventListener("click", function() {

        reset();

    });

    reset();

}

function init() {

    setupModeButtons();

    setupSquares();

    setupResetButton();

}

init();