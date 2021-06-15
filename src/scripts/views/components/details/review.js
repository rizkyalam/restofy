/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import UrlParser from '@scripts/routes/url-parser';
import api from '@scripts/configs/api';

class ReviewDetail extends HTMLElement {
  constructor() {
    super();
    this.id = UrlParser.getUrlId();
  }

  async connectedCallback() {
    const data = await api.getDetailData(this.id);
    this.innerHTML = this.renderElm();
    this.showReviewList(data.customerReviews);
    this.addRating();
  }

  renderElm() {
    return `
    <div class="review">
        <h2>Review Restaurant</h2>
        <div class="review-list"></div>
        <h3>Rate this restaurant</h3>
        <div class="review-rate">
            <h5 class="info-rate success"></h5>
            <form action="" id="form-review-rate">
                <div class="form-group">
                    <label for="name">
                        Name
                        <span class="important-form">*</span>
                    </label>
                    <input type="text" class="form-control" id="name" required>
                </div>
                <div class="form-group">
                    <label for="description">
                        Description
                        <span class="important-form">*</span>
                    </label>
                    <input type="text" class="form-control" id="description" required>
                </div>                
                <div class="form-group">
                    <button type="submit" class="review-rate--btn">Submit</button>
                </div>
            </form>
        </div>
    </div>`;
  }

  showReviewList(dataReviews, rate = false) {
    const list = document.querySelector('.review-list');

    if (dataReviews.length > 0) {
      if (rate) {
        list.innerHTML = '';
      }
      dataReviews.forEach((data) => {
        list.innerHTML += `
            <div class="review-card">
                <div class="review-card-body">
                    <h4>${data.name}</h4>
                    <p>${data.review}</p>
                    <small>${data.date}</small>
                </div>
            </div>`;
      });
    } else {
      list.innerHTML = '<error-data></error-data>';
    }
  }

  addRating() {
    const formReviewRate = document.querySelector('#form-review-rate');

    formReviewRate.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const data = await api.insertReview(this.formReview());

        if (data.length > 0) {
          this.formValidation('success');
          this.showReviewList(data, true);
        } else {
          throw new Error('Form failed !');
        }
      } catch {
        this.formValidation('warning');
      }
    });
  }

  formReview() {
    const name = document.querySelector('#name');
    const description = document.querySelector('#description');

    const data = JSON.stringify({
      id: this.id,
      name: name.value,
      review: description.value,
    });

    return data;
  }

  formValidation(info) {
    const name = document.querySelector('#name');
    const description = document.querySelector('#description');
    const infoElm = document.querySelector('.info-rate');

    infoElm.classList.remove('success');
    infoElm.classList.remove('warning');

    if (info === 'success') {
      infoElm.classList.add('success');
      infoElm.innerText = 'Rating has been successfully added';
    } else if (info === 'warning') {
      infoElm.classList.add('warning');
      infoElm.innerText = 'Rating failed to add';
    }

    name.value = '';
    description.value = '';
  }
}

export default ReviewDetail;
