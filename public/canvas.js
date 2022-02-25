
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mousedown = false;

let pencilcolor = document.querySelectorAll(".pencil-color");
let pencilwidthElem = document.querySelector(".pencil-width");
let eraserwidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let pencolor = "red";
let erasercolor = "white";
let penwidth = pencilwidthElem.value;
let eraserwidth = eraserwidthElem.value;

let undoRedo = [];
let track = 0;


//writing api now
let tool = canvas.getContext("2d");
tool.strokeStyle = pencolor;
tool.lineWidth = penwidth;

canvas.addEventListener("mousedown", (e) => {
    mousedown = true;
 
    let data = {
        x: e.clientX,
        y: e.clientY
    }
    socket.emit("beginPath", data);
})
canvas.addEventListener("mousemove", (e) => {
    if (mousedown) {
        let data = {
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag ? erasercolor : pencolor,
            width: eraserFlag ? eraserwidth : penwidth
        }
        socket.emit("drawStroke", data);
    }
})
canvas.addEventListener("mouseup", (e) => {
    mousedown = false;

    let url = canvas.toDataURL();
    undoRedo.push(url);
    track = undoRedo.length - 1;

})

undo.addEventListener("click", (e) => {
    if (track > 0)
        track--;
    let data = {
        trackvalue: track,
        undoRedo
    }
    //undoredocanvas(trackobj);
    socket.emit("redoUndo" ,data);
})

redo.addEventListener("click", (e) => {

    if (track < undoRedo.length - 1)
        track++;
    let data = {
        trackvalue: track,
        undoRedo
    }
    socket.emit("redoUndo" ,data);
    // undoredocanvas(trackobj);
})

function undoredocanvas(trackobj) {
    track = trackobj.trackvalue;
    undoRedo = trackobj.undoRedo;

    let url = undoRedo[track];
    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

}


function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

pencilcolor.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        pencolor = color;
        tool.strokeStyle = pencolor;
    })
})

pencilwidthElem.addEventListener("change", (e) => {
    penwidth = pencilwidthElem.value;
    tool.lineWidth = penwidth;
})

eraserwidthElem.addEventListener("channge", (e) => {
    eraserwidth = eraserwidthElem.value;
    tool.lineWidth = eraserwidth;
})

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = erasercolor;
        tool.lineWidth = eraserwidth;
    }
    else {
        tool.strokeStyle = pencolor;
        tool.lineWidth = penwidth;
    }
})

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "board image downloaded.jpg";
    a.click();
})

socket.on("beginPath", (data) => {
    beginPath(data);
})

socket.on("drawStroke", (data) => {
    drawStroke(data);
})

socket.on("redoUndo",(data) => {
    undoredocanvas(data);
})