/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import 'regenerator-runtime'; /* for async await transpile */
import '@styles/app.scss';
import App from '@scripts/views/app';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import swRegister from '@scripts/configs/sw-register';
import notification from '@scripts/configs/notification';

const app = new App({
  content: '#maincontent',
});

library.add(fas, far, fab);
dom.i2svg();

document.addEventListener('DOMContentLoaded', () => {
  app.renderPage();
  swRegister();
  notification._requestPermission()();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});
