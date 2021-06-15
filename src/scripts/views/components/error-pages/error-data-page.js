/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import ErrorPage from '@scripts/views/components/error-pages';

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
