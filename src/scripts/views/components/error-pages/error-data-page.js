/* eslint-disable class-methods-use-this */
import ErrorPage from './index';

class ErrorDataPage extends ErrorPage {
  connectedCallback() {
    const data = {
      title: 'Data tidak dapat di tampilkan',
      img: 'undraw-maintenance.svg',
    };
    this.innerHTML = this.renderElm(data);
  }
}

export default ErrorDataPage;
