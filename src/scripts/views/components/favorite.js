/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import config from '@scripts/configs';
import dbconfig from '@scripts/configs/idb';
import LoaderPage from '@scripts/views/components/loader-page';

class Favorite extends HTMLElement {
  async connectedCallback() {
    try {
      const data = await dbconfig.getAllFavorites();
      if (data.length === 0 || !data) {
        throw new Error();
      }
      this.innerHTML += this.renderElm();
      this.showListData(data);
      LoaderPage.removeLoader();
    } catch {
      LoaderPage.removeLoader();
      this.innerHTML += '<error-data></error-data>';
    }
  }

  renderElm() {
    return `
    <section class="favorite">
        <h2>Favorite Restaurant</h2>
        <div class="favorite-list"></div>
    </section>`;
  }

  /**
   * Element for creating list item card of explore data restaurant
   *
   * @param {*} data passing from data of restaurant
   * @returns string
   */
  elmListCard(data) {
    return `
    <div class="list-card">
      <div class="list-card-header">
        <img src="${config.apiImgUrlSmall + data.pictureId}" alt="${data.name} from ${data.city}">
      </div>
      <div class="list-card-body">
        <h3 class="list-card-title">${data.name}</h3>
        <h4 class="list-card-location">           
          📌 <span>${data.city}</span>
        </h4>
        <h4 class="list-card-rating">
          ⭐ <span>${data.rating}</span>
        </h4>
        <p class="list-card-text">${data.description}</p>
        <div class="list-card-detail">
          <a href="#/detail/${data.id}">Detail &gt;</a>        
        </div>
      </div>
    </div>`;
  }

  /**
   * Show list data restaurant per items
   */
  async showListData(restaurants) {
    const list = document.querySelector('.favorite-list');

    restaurants.forEach((restaurant) => {
      list.innerHTML += this.elmListCard(restaurant);
    });
  }
}

export default Favorite;
