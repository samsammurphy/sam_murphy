
const RADIUS = 20
const SPEED = 4
const NUMBALLS = 24

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
window.addEventListener('resize', function(){
    // get new canvas position on resize
    rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
})

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
function Ball(x, y, dx, dy, radius = 10, speed = 4, color = 'cyan') {
    
    // clean x and y so that new balls are always totally inside the canvas | avoid edge cases ;)
    x = _.clamp(x, radius, canvas.width - radius)
    y = _.clamp(y, radius, canvas.height - radius)
    
    // geometry
    this.x = x;
    this.y = y;
    this.radius = radius

    // velocity
    this.speed = speed
    this.dx = this.speed * dx
    this.dy = this.speed * dy

    // appearance
    this.colors = ['#086972', '#01a9b4', '#87dfd6', '#fbfd8a'] //https://colorhunt.co/palette/196303
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

    // interactivity
    this.maxRadius = this.radius * 4
    this.originalRadius = this.radius
    this.growthRate = SPEED / 3.14159

    // draw in canvas
    this.draw = () => circle(this.x, this.y, this.radius, this.color)

    // move the ball
    this.move = function(){

        // x direction
        if (this.x + this.radius > canvas.width || 
            this.x - this.radius < 0) {
            this.dx = -this.dx
        }

        // y direction
        if (this.y + this.radius > canvas.height || 
            this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        // velocity
        this.x += this.dx
        this.y += this.dy
    }

    this.interact = function(){

        let mouseDistance = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2)

        let mouseIsClose = mouseDistance < this.radius
        let mouseIsFar = mouseDistance > this.radius

        // grow balls if mouse is close
        if (mouseIsClose && mouse.inCanvas) {
            if (this.radius < this.maxRadius) {
                this.radius += this.growthRate;
            }  
        }

        // break balls if mouse is far
        if (mouseIsFar || !(mouse.inCanvas)) {
            if (this.radius > this.originalRadius) {
                this.radius -= this.growthRate;
            }
        }
    }
}

// random balls
function someBalls(num, radius, speed){

    let balls = []
    let colors = ["rgba(255,0,0, 0.5)", "rgba(0,255,0, 0.5)", "rgba(0,0,255, 0.5)"]

    for (var i=0; i < num; i++){

        // random start location 
        let x = Math.random() * canvas.width 
        let y = Math.random() * canvas.height

        // random direction
        let dx = Math.random() - 0.5
        let dy = Math.random() - 0.5

        balls.push(new Ball(x, y, dx, dy, radius=radius, speed=speed, color=colors[i]))
    }

    return balls
}

// get some balls
let balls = someBalls(NUMBALLS, RADIUS, SPEED)

// a circle that bounces around the screen
function play(){
    requestAnimationFrame(play);
    c.clearRect(0, 0, canvas.width, canvas.height)

    for (var i=0; i<balls.length; i++){
        balls[i].draw()
        balls[i].move()
        balls[i].interact()
    }

}

// run animation
play()