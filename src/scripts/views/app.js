/* eslint-disable class-methods-use-this */
import routes from '../routes';
import UrlParser from '../routes/url-parser';
import api from '../configs/api';
import loadNav from './components/nav';
import Explore from './components/explore';
import Reservations from './components/reservations';
import Detail from './components/details/detail';
import LoaderPage from './components/loader-page';
import Error404Page from './components/error-pages/error-404-page';
import ErrorDataPage from './components/error-pages/error-data-page';
import ReviewDetail from './components/details/review';
import Alert from './components/alert';
import Favorite from './components/favorite';

// define the custom elements
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
