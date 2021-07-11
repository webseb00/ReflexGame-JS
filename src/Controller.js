import View from './View';
import Model from './Model';

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  handleStartGame = () => {
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
    } 
  }

  handleGamePlay = () => {
    const { gameplayLevel, gameRound } = this.model.gameState;
    const { gameTimer, addCardColor, gameBoard, createGameCards, badgePoints, badgeLives, badgeName, setDashboardMessage, clearDashboardMessage, playAgainButton } = this.view;

    let startTimerInterval;
    let startCardInterval;
    let counter = 3;

    const timeToStart = () => {
      setDashboardMessage(counter, 'success');
      counter--;

      if(counter < 0) {
        setDashboardMessage('Start!', 'success');
        clearInterval(timeToStartCounter);

        setTimeout(() => {
          clearDashboardMessage();
          startTimerInterval = setInterval(timerInterval, 1000);
          startCardInterval = setInterval(cardInterval, 2000);
        }, 2000);
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

    let clickedCardNumber = null;
    let randomNumber = null;
    let cardClickable = true;

    const checkPlayerLives = () => {
      --this.model.gameState.playerLives;
      badgeLives.innerText = `${this.model.gameState.playerLives}`;
      setDashboardMessage('You lost one live! Stay focus!', 'warning');

      if(this.model.gameState.playerLives === 0) {
        clearGamePlay();
        setDashboardMessage('Game Over! You lost all lives!', 'danger');

        clickedCardNumber = null;
        randomNumber = null;
      }
    }

    const checkClickedCard = e => {
      if(e.target.classList.contains('game__board-card')) {
        clickedCardNumber = e.target.id.split('-')[1];
        // prevent multiple clicks of the same card
        if(cardClickable) {
          if(clickedCardNumber === randomNumber.toString()) {
            ++this.model.gameState.playerPoints;
            badgePoints.innerText = `${this.model.gameState.playerPoints}`;
            cardClickable = false;
          } else {
            checkPlayerLives();
          }
        }
      }
    }

    gameBoard.addEventListener('click', checkClickedCard);

    const checkIfCardClicked = () => {
      if(!clickedCardNumber) { checkPlayerLives(); }
    }

    // set interval for highlighting card
    const cardInterval = () => {
      // allow user click next random card
      cardClickable = true;

      randomNumber = Math.floor(Math.random() * numberOfCards) + 1;
      addCardColor(randomNumber);
      checkIfCardClicked();
    }

    // set interval for game timer
    const timerInterval = () => {
      --this.model.gameState.gameTimeDuration;
      gameTimer(this.model.gameState.gameTimeDuration);

      if(this.model.gameState.gameTimeDuration === 0) {
        setDashboardMessage('Time is out! Game Over!', 'success');
        clearGamePlay();
      }
    }

    const clearGamePlay = () => {
      clearInterval(startCardInterval);
      clearInterval(startTimerInterval);

      gameBoard.removeEventListener('click', checkClickedCard);

      playAgainButton.classList.remove('disabled');
      playAgainButton.addEventListener('click', this.playGameAgain);
    }
  }

  playGameAgain = () => {
    const { playAgainButton, badgeLives, gameTimer, badgePoints } = this.view;
    this.model.gameState.gameRound++;
    this.model.gameState.playerPoints = 0;
    this.model.gameState.playerLives = 3;
    this.model.gameState.gameTimeDuration = 60;

    // display default player badges
    badgeLives.innerText = `${this.model.gameState.playerLives}`;
    badgePoints.innerText = `${this.model.gameState.playerPoints}`;
    gameTimer(this.model.gameState.gameTimeDuration);
    
    playAgainButton.removeEventListener('click', this.playGameAgain);
    playAgainButton.classList.add('disabled');
    this.handleGamePlay();
  }

  cancelGame = () => {
    // reset main game state and remove event listeners 
    const { resetState } = this.model;
    const { clearPlayerInput, setWelcomePage, endGameButton, startGameButton, difficultyLevelButtons, clearDashboardMessage } = this.view;

    clearDashboardMessage();
    resetState();
    clearPlayerInput();
    setWelcomePage();

    endGameButton.removeEventListener('click', this.cancelGame);
    startGameButton.removeEventListener('click', this.handleStartGame);
    difficultyLevelButtons.forEach(button => {
      button.removeEventListener('click', e => this.setGamplayLevel(e));
      button.checked = false;
    });
    difficultyLevelButtons[0].checked = true;

    this.initFunctions();
  }

  setGameplayLevel = e => {
    const { id } = e.target;
    this.model.gameState.gameplayLevel = id;
  }

  initFunctions = () => {
    const { gameplayLevel } = this.model.gameState;
    const { startGameButton, difficultyLevelButtons, clearGameBoard } = this.view;
    difficultyLevelButtons.forEach(button => button.addEventListener('click', e => this.setGameplayLevel(e)));
    startGameButton.addEventListener('click', this.handleStartGame);
    clearGameBoard(gameplayLevel);
  }
}

const app = new Controller(new View(), new Model());

app.initFunctions();