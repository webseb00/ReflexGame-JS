class Model {
  constructor() {
    // default state for each game
    this.gameState = {
      timeToFinishGame: 0,
      squareHighlightTime: 2000,
      gameTimeDuration: 60,
      playerName: null,
      playerPoints: 0,
      playerLives: 3,
      gameplayLevel: 'easy-level',
      message: false,
      currentPage: 'welcome'
    };
  }

  resetState = () => {
    this.gameState = {
      timeToFinishGame: 0,
      squareHighlightTime: 2000,
      gameTimeDuration: 60,
      playerName: null,
      playerPoints: 0,
      playerLives: 3,
      gameplayLevel: 'easy-level',
      message: false,
      currentPage: 'welcome'
    }
  }
}

export default Model;