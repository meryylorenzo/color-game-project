// ======================================
// 1. SELECCIONAR ELEMENTOS DEL HTML
// ======================================

var squares = document.querySelectorAll(".square");

var colorDisplay = document.querySelector("#colorDisplay");

var messageDisplay = document.querySelector("#message");

var h1 = document.querySelector("h1");

var resetButton = document.querySelector("#reset");

var modeButtons = document.querySelectorAll(".mode");


// ======================================
// 2. VARIABLES DEL JUEGO
// ======================================

var colors;

var pickedColor;

var numberOfSquares = 6;

var bodyColor = "#232323";

var defaultHeaderColor = "#2c8e99";


// ======================================
// 3. ELEGIR UN COLOR GANADOR
// ======================================

function pickColor() {

    var random = Math.floor(Math.random() * colors.length);

    return colors[random];

}


// ======================================
// 4. GENERAR UN COLOR RGB ALEATORIO
// ======================================

function randomColor() {

    var r = Math.floor(Math.random() * 256);

    var g = Math.floor(Math.random() * 256);

    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";

}


// ======================================
// 5. GENERAR UN ARREGLO DE COLORES
// ======================================

function generateRandomColors(num) {

    var arr = [];

    for (var i = 0; i < num; i++) {

        arr.push(randomColor());

    }

    return arr;

}


// ======================================
// 6. CAMBIAR EL COLOR DE LOS CUADRADOS
// ======================================

function changeColors(color) {

    for (var i = 0; i < squares.length; i++) {

        squares[i].style.backgroundColor = color;

        squares[i].style.opacity = "1";

    }

}


// ======================================
// 7. REINICIAR EL JUEGO
// ======================================

function reset() {

    // Generar nuevos colores

    colors = generateRandomColors(numberOfSquares);

    // Elegir el color ganador

    pickedColor = pickColor();

    // Mostrar el código RGB ganador

    colorDisplay.textContent = pickedColor;

    // Reiniciar el mensaje

    messageDisplay.textContent = "";

    // Reiniciar el botón

    resetButton.textContent = "Nuevos Colores";

    // Reiniciar el color del título

    h1.style.backgroundColor = defaultHeaderColor;


    // Actualizar los cuadrados

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

    // Comprobar cantidad de colores

    console.log("Cantidad de colores:", colors.length);

}


// ======================================
// 8. EVENTOS DE LOS CUADRADOS
// ======================================

function setupSquares() {

    for (var i = 0; i < squares.length; i++) {

        squares[i].addEventListener("click", function() {

            // Guardar el color seleccionado

            var clickedColor = this.style.backgroundColor;


            // Comparar el color seleccionado con el ganador

            if (clickedColor === pickedColor) {

                // MENSAJE CORRECTO

                messageDisplay.textContent = "¡Correcto!";

                // Cambiar el texto del botón

                resetButton.textContent = "Play Again?";

                // Cambiar el color del título

                h1.style.backgroundColor = pickedColor;

                // Cambiar todos los cuadrados

                changeColors(pickedColor);

            } else {

                // MENSAJE INCORRECTO

                messageDisplay.textContent = "Intentalo nuevamente";

                // Cambiar el color del cuadrado al del body

                this.style.backgroundColor = bodyColor;

                // Hacer desaparecer el cuadrado

                this.style.opacity = "0";

                this.style.pointerEvents = "none";

            }

        });

    }

}


// ======================================
// 9. EVENTOS DE LOS BOTONES EASY Y HARD
// ======================================

function setupModeButtons() {

    for (var i = 0; i < modeButtons.length; i++) {

        modeButtons[i].addEventListener("click", function() {

            // Quitar selected de todos los botones

            for (var j = 0; j < modeButtons.length; j++) {

                modeButtons[j].classList.remove("selected");

            }

            // Agregar selected al botón cliqueado

            this.classList.add("selected");


            // Determinar la dificultad

            numberOfSquares = this.textContent.trim() === "Easy" ? 3 : 6;


            // Reiniciar el juego

            reset();

        });

    }

}


// ======================================
// 10. EVENTO DEL BOTON NUEVOS COLORES
// ======================================

function setupResetButton() {

    resetButton.addEventListener("click", function() {

        reset();

    });

    // Iniciar el juego cuando carga la página

    reset();

}


// ======================================
// 11. INICIALIZAR EL JUEGO
// ======================================

function init() {

    setupModeButtons();

    setupSquares();

    setupResetButton();

}


// ======================================
// 12. EJECUTAR EL JUEGO
// ======================================

init();