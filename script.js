var color = document.querySelector('#color');
var eraser = document.querySelector('#eraser');
var decrease = document.querySelector('#decrease');
var increase = document.querySelector('#increase');
var sizeEl = document.querySelector('#size');
var save = document.querySelector('#save');
var clear = document.querySelector('#clear');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// init

var pos1 = {
    x: 0, y: 0
}

var pos2 = {
    x: 0, y: 0
}

var isDrawing = false;
var colorPaint ='#000000';
var size = 10;
sizeEl.innerText = size;

// Sự kiện bắt đầu vẽ trên máy tính và màn hình cảm ứng
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing);

function startDrawing(e) {
    e.preventDefault();
    pos1 = {
        x: (e.type === 'mousedown') ? e.offsetX : e.touches[0].clientX,
        y: (e.type === 'mousedown') ? e.offsetY : e.touches[0].clientY
    }
    isDrawing = true;
}

// Sự kiện di chuyển trên máy tính và màn hình cảm ứng
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

function draw(e) {
    e.preventDefault();
    var rect = canvas.getBoundingClientRect();
    if (isDrawing) {
        pos2 = {
            x: (e.type === 'mousemove') ? e.clientX - rect.left : e.touches[0].clientX - rect.left,
            y: (e.type === 'mousemove') ? e.clientY - rect.top : e.touches[0].clientY - rect.top
        }

        // fill net ve
        ctx.beginPath();
        ctx.arc(pos1.x, pos1.y, size, 0, 2 * Math.PI);
        ctx.fillStyle = colorPaint;
        ctx.fill();

        // ve outline
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.strokeStyle = colorPaint;
        ctx.lineWidth = size * 2;
        ctx.stroke();

        pos1.x = pos2.x;
        pos1.y = pos2.y;
    }
}

// Sự kiện kết thúc vẽ trên máy tính và màn hình cảm ứng
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

function stopDrawing(e) {
    e.preventDefault();
    isDrawing = false;
}

color.addEventListener('change', function(e) {
    colorPaint = e.target.value;
});

eraser.addEventListener('click', function() {
    colorPaint = '#ffffff';
});

decrease.addEventListener('click', function() {
    size -= 5;
    size = size > 5 ? size : 5;
    sizeEl.innerText = size;
});

increase.addEventListener('click', function() {
    size += 5;
    size = size < 30 ? size : 30;
    sizeEl.innerText = size;
});

clear.addEventListener('click', function() {
    //     var canvasStats = canvas.getClientRects()[0];
    //     ctx.clearRect(0, 0, canvasStats.width, canvasStats.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener('click', function() {
    var output = canvas.toDataURL('image/png');
    save.setAttribute('href', output);
});
