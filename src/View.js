class View {
  constructor() {
    this.root = document.querySelector('#root');
    this.welcomePage = document.querySelector('#welcome-page');
    this.dashboardPage = document.querySelector('#dashboard-page');
    this.playerNameInput = document.querySelector('.player_input');
    this.difficultyLevelButtons = document.querySelectorAll('input[data-id="gameplay-level"]');
    this.startGameButton = document.querySelector('#start_game_button');
    this.infoBox = document.querySelector('#info-box');
    this.endGameButton = document.querySelector('#end-game-button');
    this.gameBoard = document.querySelector('.game__board');
    this.badgePoints = document.querySelector('#badge-points');
    this.badgeLives = document.querySelector('#badge-lives');
    this.badgeTime = document.querySelector('#badge-time');
    this.badgeName = document.querySelector('#badge-name');
    this.dashboardMessage = document.querySelector('.dashboard-message');
    this.playAgainButton = document.querySelector('#try-again');
  };

  setDashboardPage = () => {
    this.welcomePage.style.display = 'none';
    this.dashboardPage.style.display = 'block';
  }

  setWelcomePage = () => {
    this.dashboardPage.style.display = 'none';
    this.welcomePage.style.display = 'block';
  }

  createGameCards = (gameLevel, numberOfCards) => {
    let cards = ``;

    for(let i = 1; i <= numberOfCards; i++) {
      cards += `
        <div id="card-${i}" class="game__board-card"></div>
      `;
    }

    this.gameBoard.classList.add(`game__board--${gameLevel}`);
    this.gameBoard.insertAdjacentHTML('afterbegin', cards);
  }

  clearGameBoard = (gameLevel) => {
    this.gameBoard.innerHTML = '';
    this.gameBoard.classList.remove(`game__board--${gameLevel}`);
  }

  addCardColor = (randomNumber) => {
    const findCardByNumber = document.querySelector(`#card-${randomNumber}`);
    findCardByNumber.classList.add('bg-primary');

    setTimeout(() => this.removeCardColor(findCardByNumber), 2000);
  }

  removeCardColor = (card) => {
    card.classList.remove('bg-primary');
  }

  gameTimer = (time) => {
    this.badgeTime.innerText = time >= 10 ? `${time} sec.` : `0${time} sec.`; 
  }

  setMessage = (type, text) => {
    const alert = `
      <div class="alert alert-${type}" role="alert">
        ${text}
      </div>
    `;
    this.infoBox.insertAdjacentHTML('afterbegin', alert);
  }

  clearMessage = () => {
    const alertBox = document.querySelector('#info-box > .alert');
    if(alertBox) { this.infoBox.removeChild(alertBox); }
  }

  setDashboardMessage = (msg, type) => {
    this.dashboardMessage.innerHTML = `<h4 class="text-${type}">${msg}</h4>`;
  }

  clearDashboardMessage = () => {
    this.dashboardMessage.innerHTML = '';
  }

  clearPlayerInput = () => {
    this.playerNameInput.value = '';
  }
}

export default View;