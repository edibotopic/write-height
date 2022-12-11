const context = document.querySelector('canvas').getContext('2d');
const download = document.getElementById('download');

let screen = {
    color: 'black',
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,

    draw: function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

context.canvas.width = screen.width / 1.5;
context.canvas.height = screen.height / 1.5;

const color_codes = ["#d3d3d3", "#bdbdbd", "#9e9e9e", "#7d7d7d", "#696969", "black", "white"];

class Walker {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }

    move() {
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                if (this.y - this.radius > screen.y)
                    this.y -= this.speed;
                this.radius = 7;
                this.color = "rgba(211,211,211,0.1)";
                break;
            case 1:
                if (this.x + this.radius < screen.width)
                    this.x += this.speed;
                this.radius = 6;
                this.color = "rgba(189,189,189,0.1)";
                break;
            case 2:
                if (this.y + this.radius < screen.height)
                    this.y += this.speed;
                this.radius = 9;
                this.color = "rgba(125,125,125,0.1)";
                break;
            case 3:
                if (this.x - this.radius > screen.x)
                    this.x -= this.speed;
                this.radius = 4;
                this.color = "rgba(250,250,250,0.2)";
                break;
        }
    }
}

let walker = new Walker(
    screen.width * 0.35,
    screen.height * 0.35,
    6,
    "rgba(205, 205, 255, 0.2)",
    4
);

screen.draw();

function loop() {
    walker.draw();
    walker.move();
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

download.addEventListener('click', function(evt) {
    console.log(context.canvas.toDataURL());
    const link = document.createElement('a');
    link.download = 'walker.png';
    link.href = context.canvas.toDataURL();
    link.click();
    alert("⬇️  walker.png is in your Downloads folder")
    link.delete;
});
