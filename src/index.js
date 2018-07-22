const GAME_STATES = Object.freeze({
  NOT_STARTED: "NOT_STARTED",
  PLAYING: "PLAYING"
});

function GameArea(canvasID) {
  const canvas = document.getElementById(canvasID);
  this._context = canvas.getContext("2d");
  this._canvas = canvas;
  this._xSize = 20;
  this._ySize = 20;
  this.reset();
  this.setEvents();
}

Object.assign(GameArea.prototype, {
  constructor: GameArea,
  setEvents: function() {
    const canvas = this._canvas;
    this.startGame = this.startGame.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    canvas.addEventListener("click", this.startGame);
    this.startGame();
  },

  reset() {
    let y = 10;
    let x = 10;
    this._snake = [
      { x: x, y: y },
      { x: x, y: y },
      { x: x, y: y }
    ];

    this._food = null;

    this._vX = 0;
    this._vY = 0;
    this._gameState = GAME_STATES.NOT_STARTED;
  },

  setGameState: function(newState) {
    this._gameState = newState;
  },

  startGame: function() {
    if (this._gameState !== GAME_STATES.PLAYING) {
      this.setGameState(GAME_STATES.PLAYING);
      document.addEventListener("keydown", this.onKeyDown);
      this.addFood();
      this.onUpdate();
    }
  },

  addFood() {
    let snake = this._snake;
    let x;
    let y;
    let bodyPart;
    while (true) {
      x = Math.floor(Math.random() * this._xSize);
      y = Math.floor(Math.random() * this._xSize);

      let hasSnake = false;
      for (let i = 0; i < snake.length; i++) {
        bodyPart = snake[i];
        if (bodyPart.x === x && bodyPart.y === y) {
          hasSnake = true;
          break;
        }
      }

      if (!hasSnake) {
        this._food = { x: x, y: y };
        break;
      }
    }
  },

  onKeyDown(e) {
    if (this._gameState === GAME_STATES.NOT_STARTED) {
      if (e.keyCode === 32) {
        this.startGame();
      }
    }

    if (e.keyCode === 38 && this._vY !== 1) {
      // UP
      this._vX = 0;
      this._vY = -1;
    } else if (e.keyCode === 40 && this._vY !== -1) {
      // down
      this._vX = 0;
      this._vY = 1;
    } else if (e.keyCode === 39 && this._vX !== -1) {
      // right
      this._vX = 1;
      this._vY = 0;
    } else if (e.keyCode === 37 && this._vX !== 1) {
      // left
      this._vX = -1;
      this._vY = 0;
    }
  },

  getGridPosition(x, y) {
    return { x: x * 25, y: y * 25 };
  },

  onUpdate: function() {
    const food = this._food;
    const snake = this._snake;
    const snakeSize = snake.length;
    let bodyPart;

    for (let i = snakeSize - 1; i > 0; i--) {
      bodyPart = snake[i];
      const previous = snake[i - 1];
      bodyPart.x = previous.x;
      bodyPart.y = previous.y;
    }

    const snakeHead = snake[0];
    snakeHead.x += this._vX;
    snakeHead.y += this._vY;

    if (snakeHead.x >= this._xSize || snakeHead.y >= this._ySize) {
      this.reset();
      console.log("GAME OVER");
      return;
    } else if (snakeHead.x < 0 || snakeHead.y < 0) {
      this.reset();
      console.log("GAME OVER");
      return;
    }

    if (this._vX !== 0 || this._vY !== 0) {
      for (let i = 1; i < snakeSize; i++) {
        bodyPart = snake[i];
        if (bodyPart.x === snakeHead.x && bodyPart.y === snakeHead.y) {
          this.reset();
          console.log("GAME OVER");
          return;
        }
      }
    }

    const ctx = this._context;
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    ctx.beginPath();
    if (food) {
      if (snakeHead.x === food.x && snakeHead.y === food.y) {
        let nexBodyPart = snake[snakeSize - 1];
        snake.push(Object.assign({}, nexBodyPart));
        this.addFood();
      }

      ctx.fillStyle = "#ffff00";
      ctx.lineWidth = 1;
      let position = this.getGridPosition(food.x, food.y);
      ctx.rect(position.x + 2, position.y + 2, 21, 21);
      ctx.stroke();
      ctx.fill();
    }
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.lineWidth = 1;

    for (let i = 1; i < snakeSize; i++) {
      bodyPart = snake[i];
      let position = this.getGridPosition(bodyPart.x, bodyPart.y);
      ctx.rect(position.x + 2, position.y + 2, 21, 21);
      ctx.stroke();
      ctx.fill();
    }

    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.lineWidth = 1;
    let position = this.getGridPosition(snakeHead.x, snakeHead.y);
    ctx.rect(position.x + 2, position.y + 2, 21, 21);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    if (this._gameState === GAME_STATES.PLAYING) {
      setTimeout(this.onUpdate, 150);
    }
  }
});

new GameArea("area");
