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
  };

  setDashboardPage = () => {
    this.welcomePage.style.display = 'none';
    this.dashboardPage.style.display = 'block';
  }

  setWelcomePage = () => {
    this.dashboardPage.style.display = 'none';
    this.welcomePage.style.display = 'block';
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

  clearPlayerInput = () => {
    this.playerNameInput.value = '';
  }
}

export default View;