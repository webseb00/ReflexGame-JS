class View {
  constructor() {
    this.root = document.querySelector('#root');
    this.container = document.querySelector('.container');
  };

  firstPageMarkup() {
    const h1 = document.createElement('H1');
    h1.innerText = 'First page...';
    this.container.appendChild(h1);
  }


}

export default View;