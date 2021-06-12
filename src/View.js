class View {
  constructor() {
    this.root = document.querySelector('#root');
    this.playerNameInput = document.querySelector('.player_input');
    this.difficultyLevelButtons = document.querySelectorAll('input[data-id="gameplay-level"]');
    this.startGameButton = document.querySelector('#start_game_button');
    this.infoBox = document.querySelector('#info-box');
  };

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
    if(alertBox) {
      this.infoBox.removeChild(alertBox);
    }
  }

}

export default View;