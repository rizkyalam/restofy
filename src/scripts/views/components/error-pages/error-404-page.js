/* eslint-disable class-methods-use-this */
import ErrorPage from './index';

class Error404Page extends ErrorPage {
  connectedCallback() {
    const data = {
      title: 'Halaman tidak dapat di temukan',
      img: 'undraw-404.svg',
    };
    this.innerHTML = this.renderElm(data);
  }
}

export default Error404Page;
