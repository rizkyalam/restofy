/* eslint-disable import/no-unresolved */
import Home from '@scripts/views/pages/home';
import Detail from '@scripts/views/pages/detail';
import Favorite from '@scripts/views/pages/favorite';

/**
 * Create routing url pages
 */
const routes = {
  '/': Home, // default page,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
