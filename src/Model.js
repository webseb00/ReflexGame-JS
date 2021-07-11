class Model {
  constructor() {
    // default state for each game
    this.gameState = {
      squareHighlightTime: 2000,
      gameTimeDuration: 60,
      playerName: null,
      playerPoints: 0,
      playerLives: 3,
      gameplayLevel: 'easy-level',
      currentPage: 'welcome',
      gameRound: 0
    };
  }

  resetState = () => {
    this.gameState = {
      squareHighlightTime: 2000,
      gameTimeDuration: 60,
      playerName: null,
      playerPoints: 0,
      playerLives: 3,
      gameplayLevel: 'easy-level',
      currentPage: 'welcome',
      gameRound: 0
    }
  }
}

export default Model;