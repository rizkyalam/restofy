/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime'; /* for async await transpile */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  new RegExp('https://restaurant-api.dicoding.dev/*'),
  new NetworkFirst(),
);

/* eslint-disable no-restricted-globals */
self.addEventListener('install', (event) => {
  // TODO: Caching App Shell Resource
});

self.addEventListener('activate', (event) => {
  // TODO: Delete old caches
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
  // TODO: Add/get fetch request to/from caches
});
