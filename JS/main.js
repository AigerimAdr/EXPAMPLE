const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const ground = new Image ()
ground.src = 'images/ground.png'

const foodImg = new Image ()
foodImg.src = 'images/food.png'

const foodImg2 = new Image ()
foodImg2.src = 'images/food-2.jpg'

const foodImg3 = new Image ()
foodImg3.src = 'images/food-3.jpg'

const foodImg4 = new Image ()
foodImg4.src = 'images/food-4.jpg'


let box = 32
let score = 0

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let currentFoodImg = foodImg

function randomFood () {
    const images = [foodImg, foodImg2, foodImg3, foodImg4]
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
}


let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener ('keydown', direction)

let dir 

function direction (event) {
    if (event.keyCode === 37 && dir !== 'right') dir = 'left'
    else if (event.keyCode === 38 && dir !== 'down') dir = 'up'
    else if (event.keyCode === 39 && dir !== 'left') dir = 'right'
    else if (event.keyCode === 40 && dir !== 'up') dir = 'down'
}


function eatTail (head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) {
            clearInterval(game)
            setModal()
        }
    }
}

function setModal () {
    const div = document.createElement('div')
    div.setAttribute('class', 'modal')
    document.body.append(div)

    const divBox = document.createElement('div')
    divBox.setAttribute('class', 'div_box')
    div.append(divBox)

    const gameText = document.createElement('h2')
    gameText.innerText = 'GAME OVER'
    divBox.append(gameText)

    const result = document.createElement('h3')
    result.innerText = score
    divBox.append(result)

    const button = document.createElement('button')
    button.innerText = 'RESTART'
    divBox.append(button)
    button.onclick = () => location.reload();
}

function drawGame () {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(currentFoodImg, food.x, food.y)

    ctx.fillStyle = 'white'
    ctx.font = '50px Arial'
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'red'
        ctx.fillRect(snake[i].x, snake[i].y, box, box )
    }

    if (snakeX === food.x && snakeY === food.y) {
        score++
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        currentFoodImg = randomFood()
    } else {
        snake.pop()
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game)
        setModal()
    }

    if (dir === 'left') snakeX -= box
    if (dir === 'right') snakeX += box
    if (dir === 'up') snakeY -= box
    if (dir === 'down') snakeY += box

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)
    snake.unshift(newHead)
}

let game = setInterval(drawGame, 100)
