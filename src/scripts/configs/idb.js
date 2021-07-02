/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { openDB } from 'idb';
import config from './index';

const dbPromise = openDB(config.dbName, config.dbVersion, {
  upgrade(database) {
    database.createObjectStore(config.objectStoreName, { keyPath: 'id' });
  },
});

const dbconfig = {
  async getAllFavorites() {
    return (await dbPromise).getAll(config.objectStoreName);
  },
  async getFavorite(id) {
    if (!id) return;
    return (await dbPromise).get(config.objectStoreName, id);
  },
  async putFavorite(data) {
    if (!data.id) return;
    return (await dbPromise).put(config.objectStoreName, data);
  },
  async deleteFavorite(id) {
    return (await dbPromise).delete(config.objectStoreName, id);
  },
};

export default dbconfig;
