/* eslint-disable import/no-unresolved */
import Home from '../views/pages/home';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

/**
 * Create routing url pages
 */
const routes = {
  '/': Home, // default page,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
