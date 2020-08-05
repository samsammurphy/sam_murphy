const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

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
function Ball(x, y, dx, dy, r = 10, speed = 4, color = 'cyan') {
    
    // clean x and y so that ball is always totally inside the canvas | avoid edge cases ;)
    x = _.clamp(x, radius, canvas.width - radius)
    y = _.clamp(y, radius, canvas.height - radius)
    
    // geometry
    this.x = x;
    this.y = y;
    this.r = r

    // velocity
    this.speed = speed
    this.dx = this.speed * dx
    this.dy = this.speed * dy

    // appearance
    this.color = color

    // draw in canvas
    this.draw = () => circle(this.x, this.y, this.r, this.color)

    // move the ball
    this.move = function(){

        // x direction
        if (this.x + this.r > canvas.width || 
            this.x - this.r < 0) {
            this.dx = -this.dx
        }

        // y direction
        if (this.y + this.r > canvas.height || 
            this.y - this.r < 0) {
            this.dy = -this.dy
        }

        // velocity
        this.x += this.dx
        this.y += this.dy
    }
}


// random balls
function someBalls(num, radius=10, speed=4){

    let balls = []
    let colors = ["rgba(255,0,0, 0.5)", "rgba(0,255,0, 0.5)", "rgba(0,0,255, 0.5)"]

    for (var i=0; i < num; i++){

        // random start location 
        let x = Math.random() * canvas.width 
        let y = Math.random() * canvas.height

        // random direction
        let dx = Math.random() - 0.5
        let dy = Math.random() - 0.5

        balls.push(new Ball(x, y, dx, dy, r=radius, speed=speed, color=colors[i]))
        console.log(colors[i])
    }

    return balls
}

// get some balls
let balls = someBalls(3, radius=10, speed=5)

// a circle that bounces around the screen
function play(){
    requestAnimationFrame(play);
    c.clearRect(0, 0, canvas.width, canvas.height)

    for (var i=0; i<balls.length; i++){
        balls[i].draw()
        balls[i].move()
    }

}

play()