
// Global Variables.....................................................

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    playRectArea = {
        x1: (canvas.width * 0.02),
        y1: (canvas.height * 0.15),
        x2: (canvas.width * 0.98),
        y2: (canvas.height * 0.98)
    },
    ctrlRectArea = {
        x1: (canvas.width * 0.02),
        y1: (canvas.height * 0.02),
        x2: (canvas.width * 0.98),
        y2: (canvas.height * 0.125)
    },
    i = 0;

// Prototype Extension................................................

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

// Functions..........................................................

function erase() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground() {
    var deduct = 5;
    var grd = context.createLinearGradient(ctrlRectArea.x1, ctrlRectArea.y1, (ctrlRectArea.x2 - ctrlRectArea.x1), ctrlRectArea.y1);
    grd.addColorStop(0, 'rgb(200, 247, 200)');
    grd.addColorStop(0.25, 'rgb(185, 220, 255)');
    grd.addColorStop(0.5, 'rgb(255, 255, 191)');
    grd.addColorStop(1, 'rgb(255, 164, 164)');

    erase();
    setShadow('darkgray');
    drawRectangle((ctrlRectArea.x1 - deduct), (ctrlRectArea.y1 - deduct), ((ctrlRectArea.x2 + deduct) - (ctrlRectArea.x1 - deduct)), ((ctrlRectArea.y2 + deduct) - (ctrlRectArea.y1 - deduct)), 'stroke', 'black');
    drawRectangle((playRectArea.x1 - deduct), (playRectArea.y1 - deduct), ((playRectArea.x2 + deduct) - (playRectArea.x1 - deduct)), ((playRectArea.y2 + deduct) - (playRectArea.y1 - deduct)), 'stroke', 'black');
    setShadow();
    drawRectangle(playRectArea.x1, playRectArea.y1, (playRectArea.x2 - playRectArea.x1), (playRectArea.y2 - playRectArea.y1), 'stroke', 'black');
    drawRectangle(ctrlRectArea.x1, ctrlRectArea.y1, (ctrlRectArea.x2 - ctrlRectArea.x1), (ctrlRectArea.y2 - ctrlRectArea.y1), 'fill', grd);

    drawCircle(ctrlRectArea.x1 + (ctrlRectArea.x2 - ctrlRectArea.x1) / 20, ctrlRectArea.y1 + (ctrlRectArea.y2 - ctrlRectArea.y1) / 2, (ctrlRectArea.x1 + ctrlRectArea.y1) * 0.95, 'fill', 'white');
    drawCircle(ctrlRectArea.x1 + (ctrlRectArea.x2 - ctrlRectArea.x1) / 7, ctrlRectArea.y1 + (ctrlRectArea.y2 - ctrlRectArea.y1) / 2, (ctrlRectArea.x1 + ctrlRectArea.y1) * 0.95, 'fill', 'white');

    setShadow('darkgray');
    drawCircle(ctrlRectArea.x1 + (ctrlRectArea.x2 - ctrlRectArea.x1) / 20, ctrlRectArea.y1 + (ctrlRectArea.y2 - ctrlRectArea.y1) / 2, (ctrlRectArea.x1 + ctrlRectArea.y1) * 0.7, 'fill', 'green');
    drawCircle(ctrlRectArea.x1 + (ctrlRectArea.x2 - ctrlRectArea.x1) / 7, ctrlRectArea.y1 + (ctrlRectArea.y2 - ctrlRectArea.y1) / 2, (ctrlRectArea.x1 + ctrlRectArea.y1) * 0.7, 'fill', 'darkblue');
    setShadow(); 

    var blockDim = {
        width: (playRectArea.x2 - playRectArea.x1) / 10,
        height: (playRectArea.y2 - playRectArea.y1) / 10
    },
    incrementX = 0,
    incrementY = 0,
    opp = 0;

    for (i = 1; i <= 100; i++) {
        drawRectangle(playRectArea.x1 + (incrementX * blockDim.width), playRectArea.y1 + (incrementY * blockDim.height), blockDim.width, blockDim.height, 'stroke', 'black');
        if (opp == 0) {
            if (i % 2 == 0)
                drawRectangle(playRectArea.x1 + (incrementX * blockDim.width), playRectArea.y1 + (incrementY * blockDim.height), blockDim.width, blockDim.height, 'fill', 'lightgreen');
        }
        else {
            if ((i + 1) % 2 == 0)
                drawRectangle(playRectArea.x1 + (incrementX * blockDim.width), playRectArea.y1 + (incrementY * blockDim.height), blockDim.width, blockDim.height, 'fill', 'lightgreen');
        }
        incrementX += 1;
        if (incrementX % 10 == 0) {
            incrementY += 1;
            incrementX = 0;
            if (opp == 0)
                opp = 1;
            else
                opp = 0;
        }
    }
}

function drawRectangle(x, y, width, height, drawStyle, rectColor) {
    context.save();
    context.beginPath();
    if (drawStyle == 'stroke') {
        context.strokeStyle = rectColor;
        context.strokeRect(x, y, width, height);
    }
    else {
        context.fillStyle = rectColor;
        context.fillRect(x, y, width, height);
    }
    context.closePath();
    context.restore();
}

function drawCircle(x, y, radius, drawStyle, circColor) {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    if (drawStyle == 'stroke') {
        context.strokeStyle = circColor;
        context.stroke();
    }
    else {
        context.fillStyle = circColor;
        context.fill();
    }
    context.closePath();
    context.restore();
}

function setShadow(shadowColor) {
    if (shadowColor) {
        context.shadowColor = shadowColor;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 4;
    }
    else {
        context.shadowColor = undefined;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;
    }
}

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

// Event handlers.....................................................



// Initialization.....................................................

drawBackground();