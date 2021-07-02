/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/app.scss';
import App from './views/app';
import swRegister from './configs/sw-register';
import notification from './configs/notification';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  content: '#maincontent',
});

document.addEventListener('DOMContentLoaded', () => {
  app.renderPage();
  swRegister();
  notification._requestPermission();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});
