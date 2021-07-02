/* eslint-disable class-methods-use-this */
class Alert extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('data-type');
    let text = '';

    switch (type) {
      case 'add':
        text = 'Restaurant has been successfully added to favorite !';
        this.innerHTML = this.renderElm('success', text);
        break;
      case 'remove':
        text = 'Restaurant has been successfully remove from favorite !';
        this.innerHTML = this.renderElm('danger', text);
        break;
      default:
        text = 'Proccess Failed !';
        this.innerHTML = this.renderElm('danger', text);
        break;
    }
  }

  renderElm(type, text) {
    return `
    <div class="alert ${type}">${text}</div>
    `;
  }
}

export default Alert;
