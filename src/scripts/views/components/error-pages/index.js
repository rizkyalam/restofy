/* eslint-disable class-methods-use-this */
class ErrorPage extends HTMLElement {
  renderElm(data) {
    return `
    <div class="error-page">
        <h2>${data.title}</h2>
        <img src="/images/${data.img}" alt="">
    </div>
    `;
  }
}

export default ErrorPage;
