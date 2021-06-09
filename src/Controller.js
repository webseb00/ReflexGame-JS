import View from './View';
import Model from './Model';

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.gameState = {
      timeToFinishGame: 0,
      squareHighlightTime: 2000,
      gameTimeDuration: 60 * 1000,
      playerName: null,
      playerPoints: 0,
      playerLifes: 3,
      gamePlayLevel: null 
    };
  }

  createFirstPageMarkup() {
    this.view.firstPageMarkup();
  }

  initFunctions() {
    console.log('hello world!');
    console.log(this.gameState);
    this.createFirstPageMarkup();
  }
}

const app = new Controller(new View(), new Model());

app.initFunctions();