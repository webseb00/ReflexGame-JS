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
    console.log(inputValue);

    gameState.playerName = inputValue;
    this.setCurrentPage();

  }

  setCurrentPage = () => {
    const { gameState } = this.model;
    const { setDashboardPage, endGameButton } = this.view;

    if(gameState.currentPage === 'welcome') {
      gameState.currentPage = 'dashboard';
      setDashboardPage();
      endGameButton.addEventListener('click', this.cancelGame);
    } 
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
    difficultyLevelButtons.forEach(button => button.removeEventListener('click', e => this.setGamplayLevel(e)));
    this.initFunctions();
  }

  setGameplayLevel = e => {
    const { id } = e.target;
    this.model.gameState.gameplayLevel = id;
  }

  initFunctions = () => {
    const { startGameButton, difficultyLevelButtons } = this.view;
    difficultyLevelButtons.forEach(button => button.addEventListener('click', e => this.setGameplayLevel(e)));
    startGameButton.addEventListener('click', this.handleStartGame);
  }
}

const app = new Controller(new View(), new Model());

app.initFunctions();