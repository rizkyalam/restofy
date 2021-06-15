const config = {
  baseUrl: 'https://restaurant-api.dicoding.dev/',
  apiImgUrlSmall: 'https://restaurant-api.dicoding.dev/images/small/',
  apiImgUrlMedium: 'https://restaurant-api.dicoding.dev/images/medium/',
  apiConfig: {
    headers: {
      'Content-type': 'application/json',
      'X-Auth-Token': 12345,
    },
  },
  dbName: 'restofy-database',
  dbVersion: 1,
  objectStoreName: 'favorite',
};

export default config;
