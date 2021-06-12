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
      if(gameState.message) {
        return false;
      } else {
        setMessage('warning', 'Please enter your name!');
        gameState.message = true;
        return false;
      }
    }

    gameState.playerName = inputValue;
    if(gameState.message) { 
      gameState.message = false; 
      clearMessage();
      console.log(gameState);
    }
  }

  setGamePlayLevel = () => {
    const levelButtons = this.view.difficultyLevelButtons;
    
    levelButtons.forEach(button => button.addEventListener('click', e => {
      const { id } = e.target;
      this.model.gameState.gameplayLevel = id;
    }));
  }

  initFunctions = () => {
    this.setGamePlayLevel();
    this.view.startGameButton.addEventListener('click', () => this.handleStartGame());
  }
}

const app = new Controller(new View(), new Model());

app.initFunctions();