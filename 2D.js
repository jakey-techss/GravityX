const canvas = document.getElementById("planet-canvas")
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight
ctx.imageSmoothingEnabled = false

const alien = new Image()
alien.src = "/assets/Dude_Monster.png"

alien.onload = () => {
    ctx.scale(2, 2)
    const ball = {
        image: alien,
        x: 280,
        y: 260,
        radius: alien.height * 10 + 100,
        velocityY: 0,
        gravity: 0.9

    };

    ctx.beginPath();
    ctx.drawImage(alien, ball.x, ball.y)

    function animateDrop() {

        requestAnimationFrame(animateDrop);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Physics
        ball.velocityY += ball.gravity;
        ball.y += ball.velocityY;

        // Floor collision
        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.velocityY *= -1;
        }

        // Draw
        ctx.beginPath();

        ctx.drawImage(alien, ball.x, ball.y)

    }

}






