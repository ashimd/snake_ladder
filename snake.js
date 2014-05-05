// Global Variables.....................................................
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    gradient;

// Functions..........................................................
function erase() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    debugger;
    erase();
    context.beginPath();

    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.fillStyle = 'red';

    context.moveTo(105, 95);
    context.quadraticCurveTo(80, 90, 120, 80);

    context.moveTo(105, 95);
    context.quadraticCurveTo(115, 110, 120, 80);
      
    context.stroke();
    context.fill();    

}

// Initialization.....................................................
drawSnake();