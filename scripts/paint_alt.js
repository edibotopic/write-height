const canvas = document.getElementById("art");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth*0.65;
ctx.canvas.height = window.innerHeight*0.55;

// Default brush
ctx.lineCap = "round";
ctx.lineJoin = "bevel";
ctx.strokeStyle = "white";
ctx.lineWidth = 20;

// Click events
let getMousePos = (canvas, evt) => {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

let mouseMove = (evt) => {
    let mousePos = getMousePos(canvas, evt);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
}

canvas.addEventListener("mousedown" || "click", (evt) => {
    let mousePos = getMousePos(canvas, evt);
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    evt.preventDefault();
    canvas.addEventListener("mousemove", mouseMove, false);
});

canvas.addEventListener(
    "mouseup",
    () => {
        canvas.removeEventListener("mousemove", mouseMove, false);
    },
    false
);

document.getElementById("reset").addEventListener(
    "click",
    () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    false
);

//TODO: inconsistent naming
const colors = ["gray0", "gray1", "gray2", "gray3", "gray4", "black", "white"];
const color_codes = ["#d3d3d3", "#bdbdbd", "#9e9e9e", "#7d7d7d", "#696969", "black", "white"];
const sizeNames = ["default", "thin", "medium", "thick", "huge"];
const size_values = [8, 15, 20, 25, 40];

let listener = (i) => {
    document.getElementById(colors[i]).addEventListener(
        "click",
        () => {
            ctx.strokeStyle = color_codes[i];
        },
        false
    );
}

let fontSizes = (i) => {
    document.getElementById(sizeNames[i]).addEventListener(
        "click",
        () => {
            ctx.lineWidth = size_values[i];
        },
        false
    );
}

for (let i = 0; i < colors.length; i++) {
    listener(i);
}

for (let i = 0; i < size_values.length; i++) {
    fontSizes(i);
}

// Paint effects
let blur = () => {
    let check_blur = document.getElementById('blurrer');

    check_blur.addEventListener('change', function() {
        if (check_blur.checked) {
            ctx.globalAlpha = 0.01;
        } else {
            ctx.globalAlpha = 1.0;
        }
    }
    )
}
blur();

let foam = () => {
    let check_foam = document.getElementById('foamer');

    check_foam.addEventListener('change', function() {
        if (check_foam.checked) {
            ctx.shadowColor = 'rgba(200,200,200,0.6)';
            ctx.shadowBlur = 40;
        } else {
            ctx.shadowBlur = 0;
        }
    }
    )
}
foam();

// Touch for mobile
canvas.addEventListener("touchstart", function(evt) {
    mousePos = getTouchPos(canvas, evt);
    let touch = evt.touches[0];
    let mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function(evt) {
    let mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function(evt) {
    let touch = evt.touches[0];
    let mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

// Touch position relative to canvas
function getTouchPos(canvasDom, touchEvent) {
    let rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Download
const download = document.getElementById('download');
download.addEventListener('click', function(evt) {
    console.log(ctx.canvas.toDataURL());
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = ctx.canvas.toDataURL();
    link.click();
    alert("⬇️  image.png is in your Downloads folder")
    link.delete;
});
