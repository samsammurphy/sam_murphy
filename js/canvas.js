
const RADIUS = 30
const SPEED = 1
const NUMBALLS = 10

// canvas DOM element
const canvas = document.getElementById("canvas");

// canvas size and position
let rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

// 2D drawing content
const c = canvas.getContext('2d')

// mouse object
let mouse = {
    x: undefined,
    y: undefined,
    inCanvas: false
}

// mouse event listener
window.addEventListener('mousemove',
    function (event) {
        // event position is relative to window
        // mouse position is relative to canvas
        mouse.x = event.x - rect.left;
        mouse.y = event.y - rect.top;

        // check mouse is inside the canvas element
        mouse.inCanvas = (event.x > rect.left) &&
            (event.x < rect.right) &&
            (event.y < rect.bottom) &&
            (event.y > rect.top)

    }
)

// resize event listener
window.addEventListener('resize', function () {
    // get new canvas position on resize
    rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
})

// refresh button event listener
const refresh = document.getElementById("canvasRestartButton");
refresh.addEventListener('click', () => main())

// circle on canvas
function circle(x, y, r, color) {
    c.beginPath()
    c.arc(x, y, r, 0, Math.PI * 2, true)
    c.strokeStyle = color
    c.fillStyle = color
    c.stroke()
    c.fill()
}

// a ball object (for bouncing around in the canvas)
function Ball(location, radius, direction, speed, color = 'cyan') {

    // PROPERTIES
    // ----------

    // clean x and y so that new balls are always totally inside the canvas | avoid edge cases ;)
    x = _.clamp(location.x, radius, canvas.width - radius)
    y = _.clamp(location.y, radius, canvas.height - radius)

    // geometry
    this.x = x;
    this.y = y;
    this.radius = radius

    // velocity
    this.direction = direction
    this.speed = speed

    // appearance
    this.colors = ['#086972', '#01a9b4', '#87dfd6', '#fbfd8a'] //https://colorhunt.co/palette/196303
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

    // interact growth
    this.originalRadius = this.radius
    this.maxRadius = this.radius * 4
    this.growthRate = 2

    // interactive speed
    this.originalSpeed = this.speed
    this.maxSpeed = 20
    this.acceleration = 1.1
    this.deceleration = 0.5

    // METHODS
    // -------

    this.draw = () => circle(this.x, this.y, this.radius, this.color)

    this.move = function () {

        // x direction
        if (this.x + this.radius > canvas.width ||
            this.x - this.radius < 0) {
            this.direction.x = -this.direction.x
        }

        // y direction
        if (this.y + this.radius > canvas.height ||
            this.y - this.radius < 0) {
            this.direction.y = -this.direction.y
        }

        // move ball
        this.x += this.direction.x * this.speed.x
        this.y += this.direction.y * this.speed.y
    }

    this.grow = () => {
        if (this.radius < this.maxRadius) {
            this.radius += this.growthRate;
        }
    }

    this.shrink = () => {
        if (this.radius > this.originalRadius) {
            this.radius -= this.growthRate;
        }
    }

    this.accelerate = () => {
        if (this.speed.x < this.maxSpeed) {
            this.speed.x *= this.acceleration
        }
        if (this.speed.y < this.maxSpeed) {
            this.speed.y *= this.acceleration
        }
    }

    this.decelerate = () => {

        if (this.speed.x > this.originalSpeed.x) {
            this.speed.x /= this.deceleration
        }
        if (this.speed.y > this.originalSpeed.y) {
            this.speed.y /= this.deceleration
        }
    }

    this.interact = function () {

        let mouseDistance = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2)

        let mouseOverBall = mouseDistance < this.radius
        let mouseActive = mouseOverBall && mouse.inCanvas

        if (mouseActive) {
            this.grow()
            this.accelerate()
        }

        if (!(mouseActive)) {
            this.shrink()
            this.decelerate()
        }
    }
}

// random balls
function someBalls(num, radius, speed) {

    let balls = []
    let colors = ["rgba(255,0,0, 0.5)", "rgba(0,255,0, 0.5)", "rgba(0,0,255, 0.5)"]

    for (var i = 0; i < num; i++) {

        let random_location = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        }

        let random_direction = {
            x: (Math.random() > 0.5) ? -1 : 1,
            y: (Math.random() > 0.5) ? -1 : 1
        }

        let random_speed = {
            x: Math.max(SPEED * Math.random(), SPEED / 4),
            y: Math.max(SPEED * Math.random(), SPEED / 4)
        }

        balls.push(new Ball(random_location, radius, random_direction, random_speed, color = colors[i]))
    }

    return balls
}

function main() {

    // get some balls
    let balls = someBalls(NUMBALLS, RADIUS, SPEED)

    // a circle that bounces around the screen
    function play() {
        requestAnimationFrame(play);
        c.clearRect(0, 0, canvas.width, canvas.height)

        for (var i = 0; i < balls.length; i++) {
            balls[i].draw()
            balls[i].move()
            balls[i].interact()
        }

    }

    // run animation
    play()
}

main()
