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
    const { gameplayLevel, playerPoints, playerLives } = this.model.gameState;
    const { gameTimer, addCardColor, removeCardColor, gameBoard, createGameCards, badgePoints, badgeLives, badgeName } = this.view;

    badgeName.innerText = `${this.model.gameState.playerName}`;

    let numberOfCards;
    if(gameplayLevel === 'easy-level') { numberOfCards = 16; }
    if(gameplayLevel === 'medium-level') { numberOfCards = 25; }
    if(gameplayLevel === 'hard-level') { numberOfCards = 36; }

    createGameCards(gameplayLevel, numberOfCards);

    let clickedCardNumber = null;
    let randomNumber = null;

    const checkPlayerLives = () => {
      --this.model.gameState.playerLives;
      badgeLives.innerText = `${this.model.gameState.playerLives}`;

      if(this.model.gameState.playerLives === 0) {
        console.log('you lost the game!');
        clearInterval(startCardInterval);
        clearInterval(startTimerInterval);
      }
    }

    gameBoard.addEventListener('click', e => {
      if(e.target.classList.contains('game__board-card')) {
        clickedCardNumber = e.target.id.split('-')[1];
        
        if(clickedCardNumber === randomNumber.toString()) {
          ++this.model.gameState.playerPoints;
          badgePoints.innerText = `${this.model.gameState.playerPoints}`;
        } else {
          checkPlayerLives();
        }
      }
    });

    const checkIfCardClicked = () => {
      if(!clickedCardNumber) { checkPlayerLives(); }
    }

    // set interval for highlighting card
    const cardInterval = () => {
      randomNumber = Math.floor(Math.random() * numberOfCards) + 1;
      addCardColor(randomNumber);
      checkIfCardClicked();
    }

    const startCardInterval = setInterval(cardInterval, 2000);

    // set interval for game timer
    const timerInterval = () => {
      --this.model.gameState.gameTimeDuration;
      gameTimer(this.model.gameState.gameTimeDuration);

      if(this.model.gameState.gameTimeDuration === 0) {
        console.log('Time is out!');
        clearInterval(startTimerInterval);
      }
    }

    const startTimerInterval = setInterval(timerInterval, 1000);

  }

  cancelGame = () => {
    // reset main game state and remove event listeners 
    const { resetState } = this.model;
    const { clearPlayerInput, setWelcomePage, endGameButton, startGameButton, difficultyLevelButtons } = this.view;
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