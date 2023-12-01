const gameContainer = document.querySelector(".game-container");
const snakeElement = document.getElementById("snake");
const foodElement = document.getElementById("food");

let snake = [{ x: 10, y: 10 }];
let foodX, foodY;
let dx = 10, dy = 0;
let score = 0;

function getRandomCoordinate(max) {
    return Math.floor(Math.random() * max) * 10;
}

function createFood() {
    foodX = getRandomCoordinate(30);
    foodY = getRandomCoordinate(30);
    foodElement.style.left = foodX + "px";
    foodElement.style.top = foodY + "px";
}

function updateSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead);

    if (newHead.x === foodX && newHead.y === foodY) {
        score++;
        createFood();
    } else {
        snake.pop();
    }

    snakeElement.style.left = newHead.x + "px";
    snakeElement.style.top = newHead.y + "px";
}

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= 300 ||
        snake[0].y < 0 ||
        snake[0].y >= 300
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Your Score: " + score);
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            clearInterval(gameInterval);
            alert("Game Over! Your Score: " + score);
            break;
        }
    }
}
function gameOver() {
    clearInterval(gameInterval);
    alert("Game Over! Your Score: " + score);
    resetGame();
}
function resetGame() {
    // Zufällige Position für die Schlange, die innerhalb des Spielfeldes liegt
    const initialX = getRandomCoordinate(30 - 2); // 2 Einheiten Abstand von den Rändern
    const initialY = getRandomCoordinate(30 - 2); // 2 Einheiten Abstand von den Rändern

    snake = [{ x: initialX, y: initialY }];
    dx = 10;
    dy = 0;
    score = 0;
    createFood();
    gameInterval = setInterval(gameLoop, 100);
} rval = setInterval(gameLoop, 100);

function getRandomCoordinate(max) {
    return Math.floor(Math.random() * max) * 10;
}


function gameLoop() {
    updateSnake();
    checkCollision();
}

createFood();
let gameInterval = setInterval(gameLoop, 100);

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            dx = 0;
            dy = -10;
            break;
        case "ArrowDown":
            dx = 0;
            dy = 10;
            break;
        case "ArrowLeft":
            dx = -10;
            dy = 0;
            break;
        case "ArrowRight":
            dx = 10;
            dy = 0;
            break;
    }
});
resetGame();