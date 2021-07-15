import View from './View';
import Model from './Model';

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.timerInterval;
    this.cardInterval;
  }

  handleValidation = () => {
    const inputValue = this.view.playerNameInput.value;
    const regex = /[a-zA-Z]+/g;
    const { gameState } = this.model;
    const { setMessage, clearMessage } = this.view;
    // check if user enters value into input
    if(!regex.test(inputValue)) {
      setMessage('warning', 'Please enter your name!');
      setTimeout(() => clearMessage(), 4000);
      return false;
    } 
    // check if player name have up to 10 letters
    if(inputValue.length > 10) {
      setMessage('warning', 'Name can only have up to 10 letters!');
      setTimeout(() => clearMessage(), 4000);
      return false;
    } else {
      gameState.playerName = inputValue;
      this.setCurrentPage();
    }
  }

  setCurrentPage = () => {
    const { gameState } = this.model;
    const { setDashboardPage, endGameButton } = this.view;

    if(gameState.currentPage === 'welcome') {
      gameState.currentPage = 'dashboard';
      setDashboardPage();
      this.handleGamePlay();
      endGameButton.addEventListener('click', this.cancelGame);
      endGameButton.classList.add('disabled');
    } 
  }

  handleGamePlay = () => {
    const { gameplayLevel } = this.model.gameState;
    const { gameTimer, addCardColor, removeCardColor, gameBoard, createGameCards, badgePoints, badgeLives, badgeName, setDashboardMessage, clearDashboardMessage, playAgainButton } = this.view;
    let counter = 3;

    const timeToStart = () => {
      setDashboardMessage(counter, 'success');
      counter--;

      if(counter < 0) {
        setDashboardMessage('START!', 'success');
        clearInterval(timeToStartCounter);

        setTimeout(() => {
          clearDashboardMessage();
          this.timerInterval = setInterval(timerInterval, 1000);
          this.cardInterval = setInterval(cardColorInterval, 1500);
        }, 1500);
      }
    }

    const timeToStartCounter = setInterval(timeToStart, 1000);

    badgeName.innerText = `${this.model.gameState.playerName}`;

    let numberOfCards;
    if(gameplayLevel === 'easy-level') { numberOfCards = 16; }
    if(gameplayLevel === 'medium-level') { numberOfCards = 25; }
    if(gameplayLevel === 'hard-level') { numberOfCards = 36; }

    // if player is playing first time, create new cards
    if(!gameRound) { createGameCards(gameplayLevel, numberOfCards); }

    let cardNumberHolder = null,
        randomNumber = null,
        previousRandomNumber = 0,
        gameRound = 0,
        cardClickable = true,
        cardClicked = true;

    const removePlayerLive = () => {
      this.model.gameState.playerLives--;
      badgeLives.innerText = `${this.model.gameState.playerLives}`;
      setDashboardMessage('You lost one live! Stay focus!', 'warning');
    }

    const checkPlayerLives = () => { 
      if(!cardNumberHolder && this.model.gameState.playerLives >= 1) {
        removePlayerLive();
      }

      if(this.model.gameState.playerLives === 0) {
        clearGamePlay();
        setDashboardMessage('Game Over! You lost all lives!', 'danger');
        randomNumber = null;
      }
      cardNumberHolder = null;
    }

    const checkClickedCard = e => {
      if(e.target.classList.contains('game__board-card')) {
        cardNumberHolder = e.target.id.split('-')[1];
        // prevent multiple clicks of the same card
        if(cardClickable) {
          cardClicked = true;
          if(cardNumberHolder === randomNumber) {
            ++this.model.gameState.playerPoints;
            badgePoints.innerText = `${this.model.gameState.playerPoints}`;
            cardClickable = false;
          } else {
            removePlayerLive();
            checkPlayerLives();
          }
        }
      }
    }

    gameBoard.addEventListener('click', checkClickedCard);

    // get random number based on selected number of cards
    const drawRandomNumber = () => {
      randomNumber = (Math.floor(Math.random() * numberOfCards) + 1).toString();
    }

    // set interval for highlighting card
    const cardColorInterval = () => {
      // allow user click next random card
      cardClickable = true;

      drawRandomNumber();
      if(previousRandomNumber === randomNumber && gameRound !== 0) { drawRandomNumber(); }
      previousRandomNumber = randomNumber;

      const getClickedCard = addCardColor(randomNumber);
      cardClicked = false;

      setTimeout(() => {
        removeCardColor(getClickedCard);
        gameRound++;
        if(!cardClicked) {
          checkPlayerLives();
        }
      }, 1500);
    }

    // set interval for game timer
    const timerInterval = () => {
      --this.model.gameState.gameTimeDuration;
      gameTimer(this.model.gameState.gameTimeDuration);

      if(this.model.gameState.gameTimeDuration === 0) {
        setDashboardMessage('Time is out!', 'success');
        clearGamePlay();
      }
    }

    const clearGamePlay = () => {
      const { endGameButton } = this.view;

      clearInterval(this.cardInterval);
      clearInterval(this.timerInterval);

      gameBoard.removeEventListener('click', checkClickedCard);

      endGameButton.classList.remove('disabled');
      playAgainButton.classList.remove('disabled');
      playAgainButton.addEventListener('click', this.playGameAgain);
    }
  }

  playGameAgain = () => {
    const { playAgainButton, setDefaultGameFields, endGameButton, clearGameBoard } = this.view;

    this.model.gameState.gameRound++;
    this.model.gameState.playerPoints = 0;
    this.model.gameState.playerLives = 3;
    this.model.gameState.gameTimeDuration = 60;

    setDefaultGameFields(this.model.gameState.playerLives, this.model.gameState.playerPoints, this.model.gameState.gameTimeDuration);
    clearGameBoard(this.model.gameState.gameplayLevel);

    playAgainButton.removeEventListener('click', this.playGameAgain);
    playAgainButton.classList.add('disabled');
    endGameButton.classList.add('disabled');

    this.handleGamePlay();
  }

  cancelGame = () => {
    // reset main game state and remove event listeners 
    const { clearPlayerInput, setWelcomePage, endGameButton, startGameButton, difficultyLevelButtons, clearDashboardMessage, setDefaultGameFields, clearGameBoard, playAgainButton } = this.view;

    clearDashboardMessage();
    clearGameBoard(this.model.gameState.gameplayLevel);
    this.model.resetState();
    clearPlayerInput();
    setWelcomePage();
    setDefaultGameFields(this.model.gameState.playerLives, this.model.gameState.playerPoints, this.model.gameState.gameTimeDuration);

    endGameButton.removeEventListener('click', this.cancelGame);
    startGameButton.removeEventListener('click', this.handleValidation);
    difficultyLevelButtons.forEach(button => {
      button.removeEventListener('click', e => this.setGamplayLevel(e));
      button.checked = false;
    });
    difficultyLevelButtons[0].checked = true;
    playAgainButton.classList.add('disabled');

    clearInterval(this.timerInterval);
    clearInterval(this.cardInterval);

    this.initFunctions();
  }

  setGameplayLevel = e => {
    const { id } = e.target;
    this.model.gameState.gameplayLevel = id;
  }

  initFunctions = () => {
    const { startGameButton, difficultyLevelButtons } = this.view;
    difficultyLevelButtons.forEach(button => button.addEventListener('click', e => this.setGameplayLevel(e)));
    startGameButton.addEventListener('click', this.handleValidation);
  }
}

const app = new Controller(new View(), new Model());

app.initFunctions();