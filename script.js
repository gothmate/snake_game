let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let grid = 20;
let tam = 3;
let snake = [];
snake[0] = {
    x: 5 * grid,
    y: 5 * grid
}


let direction = "right";
let food = {
    x: Math.floor(Math.random() * (5- 1)) * grid,
    y: Math.floor(Math.random() * (5 - 1)) * grid
}

function criarBG(){
    context.fillStyle = '#89c47e';
    context.fillRect(0, 0, 20 * grid, 20 * grid);
}

function criarSnake(){

    for (i=0; i < snake.length; i++){
        context.fillStyle = '#827600';
        context.fillRect(snake[i].x, snake[i].y, grid-1, grid-1);
    }
}

function drawFood(){
    context.fillStyle = '#99123d';
    context.fillRect(food.x, food.y, grid, grid);
}

document.addEventListener('keydown', update);


function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down')  direction = 'up';
    if (event.keyCode == 39 && direction != 'left')  direction = 'right';
    if (event.keyCode == 40 && direction != 'up')  direction = 'down';

}

function startGame(){

    if (snake[0].x > grid*20 && direction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = grid * 20;
    if (snake[0].y > grid * 20 && direction == 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = grid * 20;

    for (i=1; i < snake.length; i++){ 
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) { 
            snake.length = 3
        }
    }

    criarBG();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'right') snakeX += grid;
    if (direction == 'left') snakeX -= grid;
    if (direction == 'up') snakeY -= grid;
    if (direction == 'down') snakeY += grid;
    
    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * grid;
        food.y = Math.floor(Math.random() * 15 + 1) * grid;
    }
 
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(startGame, 100);