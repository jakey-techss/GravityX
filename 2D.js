const canvas = document.getElementById("planet-canvas")
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight
ctx.imageSmoothingEnabled = true

const planetImage = new Image()
planetImage.src = "assets/specialPlanets/earth.png"

const ball = {
    x: 400,
    y: 100,
    radius: 30,
    velocityY: 0,
    gravity: 0.9
};

function animate() {

    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Physics
    ball.velocityY += ball.gravity;
    ball.y += ball.velocityY;

    // Floor collision
    if(ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.velocityY *= -0.8;
    }

    // Draw
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
}

animate();




