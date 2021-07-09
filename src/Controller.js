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
    
    if(!regex.test(inputValue)) {
      setMessage('warning', 'Please enter your name!');
      setTimeout(() => clearMessage(), 4000);
      return false;
    }

    gameState.playerName = inputValue;
    this.setCurrentPage();
  }

  setCurrentPage = () => {
    const { gameState } = this.model;
    const { setDashboardPage, endGameButton, createGameCards } = this.view;

    if(gameState.currentPage === 'welcome') {
      gameState.currentPage = 'dashboard';
      setDashboardPage();
      this.handleGamePlay();
      endGameButton.addEventListener('click', this.cancelGame);
    } 
  }

  handleGamePlay = () => {
    const { gameplayLevel, playerPoints } = this.model.gameState;
    const { gamePlayTimer, addCardColor, gameBoard, createGameCards } = this.view;

    let numberOfCards;
    if(gameplayLevel === 'easy-level') { numberOfCards = 16; }
    if(gameplayLevel === 'medium-level') { numberOfCards = 25; }
    if(gameplayLevel === 'hard-level') { numberOfCards = 36; }

    createGameCards(gameplayLevel, numberOfCards);

    let clickedCardNumber = null;
    let randomNumber = null;

    gameBoard.addEventListener('click', e => {
      if(e.target.classList.contains('game__board-card')) {
        clickedCardNumber = e.target.id.split('-')[1];
        
        if(clickedCardNumber === randomNumber.toString()) {
          console.log(clickedCardNumber);
          ++this.model.gameState.playerPoints;
          console.log(`Player points: ${this.model.gameState.playerPoints}`);
        }
      }
    });

    setInterval(() => {
      randomNumber = Math.floor(Math.random() * numberOfCards) + 1;
      addCardColor(randomNumber);
    }, 2000);
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