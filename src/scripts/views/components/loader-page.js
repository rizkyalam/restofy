/* eslint-disable class-methods-use-this */
class LoaderPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.renderElm();
  }

  renderElm() {
    return `
    <section class="loader-page">
      <h2>Load the data ...</h2>
      <div class="loader-circle"></div>
    </section>
    `;
  }

  static removeLoader() {
    const loaderPage = document.querySelector('loader-page');

    if (loaderPage) {
      loaderPage.remove();
    }
  }
}

export default LoaderPage;
