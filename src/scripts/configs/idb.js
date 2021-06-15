/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { openDB } from 'idb';
import config from '@scripts/configs';

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
    return (await dbPromise).get(config.objectStoreName, id);
  },
  async putFavorite(data) {
    return (await dbPromise).put(config.objectStoreName, data);
  },
  async deleteFavorite(id) {
    return (await dbPromise).delete(config.objectStoreName, id);
  },
};

export default dbconfig;
