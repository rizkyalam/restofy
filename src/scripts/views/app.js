/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
import routes from '@scripts/routes';
import UrlParser from '@scripts/routes/url-parser';
import api from '@scripts/configs/api';
import loadNav from '@scripts/views/components/nav';
import Explore from '@scripts/views/components/explore';
import Reservations from '@scripts/views/components/reservations';
import Detail from '@scripts/views/components/details/detail';
import LoaderPage from '@scripts/views/components/loader-page';
import Error404Page from '@scripts/views/components/error-pages/error-404-page';
import ErrorDataPage from '@scripts/views/components/error-pages/error-data-page';
import ReviewDetail from '@scripts/views/components/details/review';
import Alert from '@scripts/views/components/alert';
import Favorite from '@scripts/views/components/favorite';

customElements.define('explore-restaurant', Explore);
customElements.define('form-reservations', Reservations);
customElements.define('detail-restaurant', Detail);
customElements.define('loader-page', LoaderPage);
customElements.define('error-404', Error404Page);
customElements.define('error-data', ErrorDataPage);
customElements.define('detail-review', ReviewDetail);
customElements.define('alert-favorite', Alert);
customElements.define('favorite-restaurant', Favorite);

class App {
  constructor({ content }) {
    api.getAllData();
    this.content = document.querySelector(content);
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (page) {
      this.content.innerHTML = '<loader-page></loader-page>';
      try {
        this.content.innerHTML += await page.render();
      } catch (e) {
        this.content.innerHTML += '<error-data></error-data>';
      }
    } else {
      this.content.innerHTML = '<error-404></error-404>';
    }

    this.loadComponents();
  }

  /**
   * Load Components for non web components
   */
  loadComponents() {
    loadNav();
  }
}

export default App;
