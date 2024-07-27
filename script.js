const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startGame');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let gameInterval;

function startGame() {
    resetGame();
    generateFood();
    gameInterval = setInterval(gameLoop, 100);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    clearInterval(gameInterval);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function gameLoop() {
    updateSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over! Refresh to play again.');
        return;
    }
    draw();
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        generateFood();
    } else {
        snake.unshift(head);
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    // Check wall collisions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    
    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -10 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 10 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -10, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 10, y: 0 };
            break;
    }
});

startButton.addEventListener('click', startGame);