/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
import UrlParser from '../../../routes/url-parser';
import api from '../../../configs/api';
import config from '../../../configs';
import LoaderPage from '../loader-page';
import dbconfig from '../../../configs/idb';
import { restaurant } from '../../../../databases/detail.json';

class Detail extends HTMLElement {
  async connectedCallback() {
    try {
      this.id = UrlParser.getUrlId();
      const mode = this.getAttribute('data-mode');
      const data = mode === 'testing' ? restaurant : await api.getDetailData(this.id);
      this.innerHTML = this.renderElm(data);
      this.showMenus(data, 'foods');
      this.showMenus(data, 'drinks');
      this.favoriteRestaurant(data);
      this.showCategories(data);
      this.toggleCategories();
      LoaderPage.removeLoader();
    } catch (e) {
      this.innerHTML += '<error-data></error-data>';
      LoaderPage.removeLoader();
    }
  }

  renderElm(data) {
    return `
    <section class="detail">
      <h2>Detail Restaurant</h2>
      <div class="detail-card">
        <div class="detail-card-img">
          <img 
            class="lazyload" 
            data-src="${config.apiImgUrlMedium + data.pictureId}" 
            alt="Detail of ${data.pictureId}"
          >
        </div>
        <div class="detail-card-body">
          <h3 class="detail-card-name">${data.name}</h3>
          <h4 class="detail-card-location">
          📌 <span>${data.city}, ${data.address}</span>
          </h4>
          <h4 class="detail-card-rating">
            ⭐ <span>${data.rating}</span>
          </h4>
          <div class="detail-card-food">
          🍕 <span></span>
          </div>
          <div class="detail-card-drink">
          ☕ <span></span>
          </div>
          <div class="detail-card-categories">
            Categories: <span></span>
          </div>

          <a href="#" class="detail-card-collapse" aria-label="read-description">
            <span>Description</span>
            &gt;
          </a>

          <div class="detail-card-description">
            <div class="detail-card-description-header">
              <h4>Description</h4>
              <a href="#" class="detail-card-collapse-close" aria-label="close-description">
                &times;
              </a>
            </div>
            <div class="detail-card-description-body">
              <p>${data.description}</p>
            </div>
          </div>
        </div>
      </div>
      <detail-review></detail-review>
      <div class="explore-restaurant">
        <a href="#explore">Explore Other Restaurant</a>
      </div>
    </section>`;
  }

  async showMenus(data, categories) {
    const menus = data.menus[categories];
    let detail = null;

    switch (categories) {
      case 'foods':
        detail = document.querySelector('.detail-card-food span');
        break;
      case 'drinks':
        detail = document.querySelector('.detail-card-drink span');
        break;
      default:
        detail = null;
        break;
    }

    menus.forEach((menu) => {
      detail.innerHTML += `${menu.name}, `;
    });
  }

  async showCategories(data) {
    const { categories } = data;
    const detail = document.querySelector('.detail-card-categories span');

    categories.forEach((categorie) => {
      detail.innerHTML += ` ${categorie.name},`;
    });
  }

  async favoriteRestaurant(apiData) {
    const detailCardBody = document.querySelector('.detail-card-body');
    const dataFavorite = await dbconfig.getFavorite(this.id);

    if (dataFavorite) {
      detailCardBody.appendChild(this.removeFromFavorite(apiData));
    } else {
      detailCardBody.appendChild(this.addToFavorite(apiData));
    }
  }

  btnFavorite() {
    const btn = document.createElement('button');
    btn.classList.add('detail-favorite');
    return btn;
  }

  addToFavorite(data) {
    const btn = this.btnFavorite();
    btn.classList.remove('delete');
    btn.classList.add('insert');
    btn.innerText = 'Add To Favorite';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.reRenderElmAfterClickBtnFavorite('add', data);
    });

    return btn;
  }

  removeFromFavorite(data) {
    const btn = this.btnFavorite();
    btn.classList.remove('insert');
    btn.classList.add('delete');
    btn.innerText = 'Delete From Favorite';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.reRenderElmAfterClickBtnFavorite('remove', data);
    });

    return btn;
  }

  reRenderElmAfterClickBtnFavorite(type, data) {
    this.innerHTML = '';
    this.innerHTML += '<loader-page></loader-page>';

    try {
      if (type === 'add') {
        dbconfig.putFavorite(data);
      } else if (type === 'remove') {
        dbconfig.deleteFavorite(data.id);
      } else {
        throw new Error('No type !');
      }

      // re-render the element
      this.innerHTML = '';
      if (type === 'add') {
        this.innerHTML += '<alert-favorite data-type="add"></alert-favorite>';
      } else if (type === 'remove') {
        this.innerHTML += '<alert-favorite data-type="remove"></alert-favorite>';
      }
      this.innerHTML += this.renderElm(data);
      this.showMenus(data, 'foods');
      this.showMenus(data, 'drinks');
      this.favoriteRestaurant(data);
      this.showCategories(data);
      this.toggleCategories();
    } catch {
      this.innerHTML += '<alert-favorite data-type="failed"></alert-favorite>';
      LoaderPage.removeLoader();
      this.innerHTML += '<error-data></error-data>';
    }

    this.removeAlert();
  }

  removeAlert() {
    const alert = document.querySelector('alert-favorite');

    setTimeout(() => {
      alert.remove();
    }, 4000);
  }

  toggleCategories() {
    const descriptionOpen = document.querySelector('.detail-card-collapse');
    const descriptionCard = document.querySelector('.detail-card-description');
    const descriptionClose = document.querySelector('.detail-card-collapse-close');

    descriptionOpen.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      descriptionCard.style.display = 'block';

      setTimeout(() => {
        descriptionCard.classList.add('active');
        descriptionClose.style.display = 'block';
        descriptionOpen.style.display = 'none';
      }, 100);
    });

    descriptionClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      descriptionCard.classList.remove('active');

      setTimeout(() => {
        descriptionOpen.style.display = 'flex';
        descriptionCard.style.display = 'none';
        descriptionClose.style.display = 'none';
      }, 200);
    });
  }
}

export default Detail;
