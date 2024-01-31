var color = document.querySelector('#color');
var eraser = document.querySelector('#eraser');
var decrease = document.querySelector('#decrease');
var increase = document.querySelector('#increase');
var size = document.querySelector('#size');
var save = document.querySelector('#save');
var clear = document.querySelector('#clear');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');



var pos1 = {
    x: 0, y: 0
}

var pos2 = {
    x: 0, y: 0
}

var isDrawing = false

document.addEventListener('mousedown', function(e) {
    pos1 = {
        x: e.offsetX,
        y: e.offsetY
    }
    isDrawing = true
})

document.addEventListener('mousemove', function(e) {
    if (isDrawing) {
        pos2 = {
            x: e.offsetX,
            y: e.offsetY
        }
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.stroke();

        pos1.x = pos2.x;
        pos1.y = pos2.y;
    }
})

document.addEventListener('mouseup', function(e) {
    isDrawing = false
})