/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
class Reservations extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.renderElm();
  }

  renderElm() {
    return `
    <section class="reservation" id="reservation">
        <div class="reservation-header">
            <h2>Reservations</h2>
            <p>You can reserve a table from our website. We recommended making reservations at least 5 days in advance.</p>
        </div>
        <div class="reservation-body">
            <form action="">
                <div class="form-group">
                    <label for="full-name">
                        Full Name 
                        <span class="important-form">*</span>
                    </label>
                    <input type="text" class="form-control" id="full-name" required>
                </div>
                <div class="form-group">
                    <label for="phone">
                        Phone Number
                        <span class="important-form">*</span>
                    </label>
                    <input type="text" class="form-control" id="phone" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control" id="email" required>
                </div>
                <div class="form-group">
                    <label for="date">
                        Date
                        <span class="important-form">*</span>
                    </label>
                    <input type="date" class="form-control" id="date" required>
                </div>
                <div class="form-group">
                    <label for="guest">
                        Number of Guests
                        <span class="important-form">*</span>
                    </label>
                    <input type="number" class="form-control" id="guest" required>
                </div>
                <div class="form-group">
                    <label for="comment">Comments</label>
                    <input type="text" class="form-control" id="comment" required>
                </div>
                <div class="form-group">
                    <button type="button" class="reservation--btn">Submit</button>
                </div>
            </form>
        </div>
    </section>
    `;
  }
}

export default Reservations;
