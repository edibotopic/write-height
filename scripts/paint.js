/* TODO: works well | square function not working (who cares?) | results in probably more spikiness */
/* TODO: make (default) option? */
const canvas = document.getElementById("art");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth * 0.65;
ctx.canvas.height = window.innerHeight * 0.55;

let x = 0;
let y = 0;
let lastX;
let lastY;
let ColorStop1 = "rgba(250,250,250,1)";
let ColorStop0 = "rgba(250,250,250,0)";

const circle = Math.PI;
const slant = Math.sin(90);

let pen = circle;

function draw(x, y, w) {
    let gradient = ctx.createRadialGradient(x, y, 0, x, y, w);
    gradient.addColorStop(0, ColorStop1);
    gradient.addColorStop(1, ColorStop0);

    ctx.beginPath();
    ctx.arc(x, y, w, 0, 2 * pen);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
};

let w = 15;
/* let radius = w / 2; */
let drawing = false;

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    draw(lastX, lastY, w, 100, 100, 100, 0.5);
});

canvas.addEventListener("mouseup", (e) => {
    drawing = false;
});

canvas.addEventListener("mousemove", (e) => {
    if (drawing == true) {
        x = e.offsetX;
        y = e.offsetY;

        // the distance the mouse has moved since last mousemove event
        let distanceMoved = Math.sqrt(Math.pow(lastX - x, 2) + Math.pow(lastY - y, 2));

        // for each pixel distance, draw a circle on the line connecting the two points
        // to get a continous line.
        for (i = 0; i < distanceMoved; i += 1) {
            let s = i / distanceMoved;
            draw(lastX * s + x * (1 - s), lastY * s + y * (1 - s), w, 100, 100, 100, 0.5);
        }
        lastX = x;
        lastY = y;
    };
});

document.getElementById("reset").addEventListener(
    "click",
    () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    false
);

//TODO: inconsistent naming NOTE: create two lists of codes for gradient
const colors = ["gray0", "gray1", "gray2", "gray3", "gray4", "black", "white"];
const color_codes = ["rgba(211,211,211,", "rgba(189,189,189,", "rgba(158,158,158,", "rgba(125,125,125,", "rgb(105,105,105,", "rgb(0,0,0,", "rgb(250,250,250,"];
const sizeNames = ["default", "thin", "medium", "thick", "huge"];
const size_values = [4, 8, 15, 20, 40];

let listener = (i) => {
    document.getElementById(colors[i]).addEventListener(
        "click",
        () => {
            ColorStop0 = color_codes[i] + "0)";
            console.log(ColorStop0)
            ColorStop1 = color_codes[i] + "1)";
            console.log(ColorStop1)
        },
        false
    );
}

let fontSizes = (i) => {
    document.getElementById(sizeNames[i]).addEventListener(
        "click",
        () => {
            w = size_values[i];
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

let square = () => {
    let check_square = document.getElementById('squarer');

    check_square.addEventListener('change', function() {
        if (check_square.checked) {
           pen=slant; 
        } else {
           pen=circle;
        }
    }
    )
}
square();

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
