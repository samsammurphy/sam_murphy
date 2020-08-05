
const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

// rectangle
c.fillStyle = "rgba(255,0,0, 0.5)"
c.fillRect(0, 0, 100, 100)
c.fillStyle = "rgba(0,255,0, 0.5)"
c.fillRect(40, 20, 100, 100)
c.fillStyle = "rgba(0,0,255, 0.5)"
c.fillRect(80, 40, 100, 100)

// line
c.beginPath()
c.moveTo(0,0)
c.lineTo(40,40)
c.lineTo(120, 40)
c.lineTo(160, 80)
c.strokeStyle = "rgb(0,255,255)"
c.stroke()

// arc / circle
function circle(x, y, r=10, color='red'){
    c.beginPath()
    c.arc(x, y, r, 0, Math.PI * 2, true)
    c.strokeStyle = color
    c.stroke()
}


for (var i=0; i < 3; i++){
    let x = Math.random() * canvas.width
    let y = Math.random() * canvas.height
    circle(x, y)

}