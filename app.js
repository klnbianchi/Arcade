function snakeGame() {
  const snake = {
    body: [[10, 5], [10, 6], [10, 7], [10, 8]],
    nextDirection: [0, 1]
  }

  const gameState = {
    apple: [10, 11],
    snake: snake,
    banana: [0, 0],
    poison: [12, 7]
  }

  const initialState = {
    body: [[10, 5], [10, 6], [10, 7], [10, 8]],
    nextDirection: [0, 1],
    apple: [10, 11],
    banana: [5, 12],
    poison: []
  }
  // scores
  let currentScore = 0;
  let bestScore = 0;
  let newHighScore = localStorage.getItem("score");

  let gameLoop;

  function buildInitialState() {
    const snakeBody = initialState.body;
    const applePostion = initialState.apple;
    currentScore = 0;

    $('.snake').remove();
    $('.apple').remove();
    $('.banana').remove();
    $('.poison').remove();

    snakeBody.map(function (element) {
      $('.snake-gameboard').append($('<div class="snake"></div>').css('grid-row', element[0]).css('grid-column', element[1]));
    });
    $('.snake-gameboard').append($('<div class="apple"></div>')
      .css('grid-row', applePostion[0])
      .css('grid-column', applePostion[1]));
    $('.current-score').text('0');
    $('.body-length').text('4');
    createHighScore();
    $('best-score').text(bestScore);
  }

  function renderState() {
    const snakeBody = snake.body;
    const applePostion = gameState.apple;
    const poisonPosition = gameState.poison;

    if ($('.snake-gameboard div').hasClass('apple')) {
      $('.apple').remove();
    }
    $('.snake-gameboard').append($('<div class="apple"></div>')
      .css('grid-row', applePostion[0])
      .css('grid-column', applePostion[1]));

    if ($('.snake-gameboard div').hasClass('snake')) {
      $('.snake').remove();
    }
    for (let i = 0; i < snake.body.length; i++) {
      $('.snake-gameboard').append($('<div class="snake"></div>')
        .css('grid-row', snakeBody[i][0])
        .css('grid-column', snakeBody[i][1]));
    }

    $('.snake-gameboard').append($('<div class="poison"></div>')
      .css('grid-row', poisonPosition[0])
      .css('grid-column', poisonPosition[1]));
  }

  function runGame(speed) {
    if (typeof gameLoop !== "undefined") {
      clearInterval(gameLoop);
    }
    gameLoop = setInterval(tick, 1000 / speed);
  }

  function moveSnakeHead() {
    const directionX = snake.nextDirection[0];
    const directionY = snake.nextDirection[1];
    const head = snake.body[snake.body.length - 1];
    let newSnakeHead = [head[0] + directionX, head[1] + directionY];

    snake.body.shift();
    snake.body.push(newSnakeHead);
  }

  function moveApple() {
    let appleDirectionX = gameState.apple[0];
    let appleDirectionY = gameState.apple[1];
    let snakeHeadX = snake.body[snake.body.length - 1][0];
    let snakeHeadY = snake.body[snake.body.length - 1][1];

    if (snakeHeadX === appleDirectionX && snakeHeadY === appleDirectionY) {
      snake.body.push([appleDirectionX, appleDirectionY]);

      appleDirectionX = Math.ceil(Math.random() * 19);
      appleDirectionY = Math.ceil(Math.random() * 19);

      currentScore += 1;
    }

    $('.current-score').text(currentScore);
    createHighScore();
    $('.best-score').text(bestScore);
    gameState.apple = [appleDirectionX, appleDirectionY];
  }

  function gameOver() {
    let highScore = bestScore;
    localStorage.setItem("score", highScore);
    const updatedScore = currentScore;
    const snakeHead = snake.body[snake.body.length - 1];
    let snakeX = snakeHead[0];
    let snakeY = snakeHead[1];
    const snakeBody = snake.body;

    if (snakeX < 1 || snakeX > 20 || snakeY < 1 || snakeY > 20) {
      clearInterval(gameLoop);
      $('.game-over').fadeIn();
    }

    for (let i = 0; i < snakeBody.length - 2; i++) {
      let snakeBodyX = snakeBody[i][0];
      let snakeBodyY = snakeBody[i][1];
      if (snakeX === snakeBodyX && snakeY === snakeBodyY) {
        clearInterval(gameLoop);
        $('.game-over').fadeIn();
      }
    }

    if (updatedScore < 0) {
      clearInterval(gameLoop);
      $('.game-over').fadeIn();
    }
  }

  function createHighScore() {
    bestScore = Number(newHighScore);

    while (bestScore < currentScore) {
      bestScore++;
    }
  }

  function speedUpSnake() {
    let score = currentScore;
    let speedUp = 8;

    for (let i = -1; i < score; i++) {
      speedUp++
    }
    runGame(speedUp);
  }
  // extra features
  function addBanana() {
    if (currentScore === 6) {
      gameState.banana.splice(0, 2);
      gameState.banana.push(5, 12);
      $('.snake-gameboard').append($('<div class="banana"></div>')
        .css('grid-row', gameState.banana[0])
        .css('grid-column', gameState.banana[1]));
    }
  }

  function moveBanana() {
    let bananaX = gameState.banana[0];
    let bananaY = gameState.banana[1];
    let snakeHeadX = snake.body[snake.body.length - 1][0];
    let snakeHeadY = snake.body[snake.body.length - 1][1];

    if (snakeHeadX === bananaX && snakeHeadY === bananaY) {
      snake.body.push([bananaX, bananaY]);

      gameState.banana.splice(0, 2);
      gameState.banana.push(Math.ceil(Math.random() * 19), Math.ceil(Math.random() * 19));

      currentScore += 2;

    }
  }

  function renderBanana() {
    const bananaPosition = gameState.banana;

    if ($('.snake-gameboard div').hasClass('banana')) {
      $('.banana').remove();
    }
    $('.snake-gameboard').append($('<div class="banana"></div>')
      .css('grid-row', bananaPosition[0])
      .css('grid-column', bananaPosition[1]));
  }


  function hitPoison() {
    let poisonX = gameState.poison[0];
    let poisonY = gameState.poison[1];
    let snakeHeadX = snake.body[snake.body.length - 1][0];
    let snakeHeadY = snake.body[snake.body.length - 1][1];

    if (snakeHeadX === poisonX && snakeHeadY === poisonY) {
      snake.body.shift();
      currentScore -= 2;
      gameState.poison.splice(0, 2);
      gameState.poison.push(Math.ceil(Math.random() * 19), Math.ceil(Math.random() * 19));
    }
  }

  function renderPoison() {
    const poisonPosition = gameState.poison;

    if ($('.snake-gameboard div').hasClass('poison')) {
      $('.poison').remove();
    }
    $('.snake-gameboard').append($('<div class="poison"></div>')
      .css('grid-row', poisonPosition[0])
      .css('grid-column', poisonPosition[1]));
  }

  function trackBodyLength() {
    const snakeBodyLength = gameState.snake.body.length;

    $('.body-length').text(snakeBodyLength);
  }

  function tick() {
    moveSnakeHead();
    moveApple();
    speedUpSnake();
    addBanana();
    moveBanana();

    if (currentScore > 6) {
      renderBanana()
    }

    hitPoison();
    renderPoison();
    renderState();
    trackBodyLength();
    gameOver();
  }

  $(window).on('keydown', function (event) {
    let snakeDirectionX = snake.nextDirection[0];
    let snakeDirectionY = snake.nextDirection[1];

    switch (event.which) {
      case 37: // left
        if (snakeDirectionY !== 1) {
          snake.nextDirection = [0, -1];
        }
        break;

      case 38: // up
        if (snakeDirectionX !== 1) {
          snake.nextDirection = [-1, 0];
        }
        break;

      case 39: // right
        if (snakeDirectionY !== -1) {
          snake.nextDirection = [0, 1];
        }
        break;

      case 40: // down
        if (snakeDirectionX !== -1) {
          snake.nextDirection = [1, 0];
        }
        break;

      default: return;
    }
  });

  $('.start').click(function () {
    buildInitialState();
    runGame(8);
    $('.start').css('display', 'none');
  })

  $('.game-over button').click(function () {
    buildInitialState();

    $('.start').css('display', 'unset');
    $('.game-over').css('display', 'none');

    snake.body = [[10, 5], [10, 6], [10, 7], [10, 8]];
    gameState.apple = [10, 11];
    gameState.banana = [0, 0];
    snake.nextDirection = [0, 1];
    gameState.poison = [12, 7];
  });
 
  let keys = {};
  window.addEventListener("keydown",
    function (e) {
      keys[e.code] = true;
      switch (e.code) {
        case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight":
        case "Space": e.preventDefault(); break;
        default: break;
      }
    },
    false);
  window.addEventListener('keyup',
    function (e) {
      keys[e.code] = false;
    },
    false);
}

snakeGame();


