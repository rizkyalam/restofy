/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-unresolved
import config from '../../configs';
import LoaderPage from './loader-page';

class Explore extends HTMLElement {
  constructor() {
    super();

    this.data = sessionStorage.getItem('restaurant');
    this.restaurants = JSON.parse(this.data);
    this.index = this.restaurants !== null ? {
      offset: 0,
      limit: 2,
      length: this.restaurants.length - 1,
    } : {};
  }

  connectedCallback() {
    try {
      this.innerHTML += this.renderElm();
      this.showListData();
      this.loadMoreData();
      LoaderPage.removeLoader();
      if (!this.restaurants) {
        throw new Error('Data is null');
      }
    } catch (e) {
      this.innerHTML = '<error-data></error-data>';
      LoaderPage.removeLoader();
    }
  }

  renderElm() {
    return `
      <section class="explore">
        <h2>Explore Restaurant</h2>
        <div class="explore-list"></div>
        <div class="explore-more">
          <button class="explore-more--btn">Load More</button>
        </div>
      </section>
    `;
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
        <img 
          class="lazyload" 
          data-src="${config.apiImgUrlSmall + data.pictureId}" 
          alt="${data.name} from ${data.city}"
        >
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
  async showListData() {
    const list = document.querySelector('.explore-list');
    const data = await this.restaurants;

    for (let i = this.index.offset; i <= this.index.limit; i++) {
      list.innerHTML += this.elmListCard(data[i]);

      if (i === this.index.limit) {
        this.index.offset = i >= this.index.length ? i : ++i;
      }
    }
  }

  /**
   * Logic for add more items data restaurant when load more button is clicked
   */
  addMoreItemsData() {
    if (this.index.offset < this.index.length) {
      if (this.index.limit < this.index.length) {
        const tmpLimit = this.index.limit + 3;
        const total = tmpLimit - this.index.length;

        this.index.limit = total === 1 || total === 2 ? tmpLimit - total : tmpLimit;

        this.showListData();
      }
    }
  }

  loadMoreData() {
    const button = document.querySelector('.explore-more--btn');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.addMoreItemsData();

      // deleting button with parent element
      if (this.index.offset === this.index.length) {
        document.querySelector('.explore-more').remove();
      }
    });
  }
}

export default Explore;
