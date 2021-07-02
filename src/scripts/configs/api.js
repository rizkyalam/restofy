import config from './index';

const api = {
  async getAllData() {
    const response = await fetch(`${config.baseUrl}list`);
    const json = await response.json();

    sessionStorage.setItem('restaurant', JSON.stringify(json.restaurants));
  },

  async getDetailData(id) {
    const response = await fetch(`${config.baseUrl}detail/${id}`);
    const json = await response.json();

    return json.restaurant;
  },

  async insertReview(data) {
    try {
      const { headers } = config.apiConfig;
      const fetchConfig = {
        method: 'post',
        headers,
        body: data,
      };

      const response = await fetch(`${config.baseUrl}review`, fetchConfig);
      const json = await response.json();

      return json.customerReviews;
    } catch {
      return null;
    }
  },
};

export default api;
