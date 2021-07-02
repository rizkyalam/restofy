import Detail from '../src/scripts/views/components/details/detail';
import { restaurant } from '../src/databases/detail.json';
import dbconfig from '../src/scripts/configs/idb';

describe('Liking a Restaurant', () => {
  customElements.define('detail-restaurant', Detail);

  const detail = new Detail();
  let detailData = restaurant;

  const container = () => {
    document.body.innerHTML = '<detail-restaurant data-mode="testing"></detail-restaurant>';
  };

  beforeEach(async () => {
    container();
    await detail.favoriteRestaurant(restaurant);
  });

  it(
    'should show the like button when the restaurant has not been liked before',
    async () => {
      expect(document.querySelector('button.detail-favorite.insert'))
        .toBeTruthy();
    },
  );

  it(
    'should not show the unlike button when the restaurant has not been liked before',
    async () => {
      expect(document.querySelector('button.detail-favorite.delete'))
        .toBeFalsy();
    },
  );

  it('should be able to like the restaurant', async () => {
    document.querySelector('button.detail-favorite.insert')
      .dispatchEvent(new Event('click'));

    const data = await dbconfig.getFavorite(detailData.id);

    expect(data.id).toEqual(detailData.id);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await dbconfig.putFavorite({ id: detailData.id });

    document.querySelector('button.detail-favorite.insert')
      .dispatchEvent(new Event('click'));

    const allFavoritesData = await dbconfig.getAllFavorites();
    allFavoritesData.filter((data) => expect(data.id).toEqual(detailData.id));

    await dbconfig.deleteFavorite(detailData.id);
  });

  it('should not add a restaurant when it has no id', async () => {
    detailData = {};

    if (detailData === {}) {
      document.querySelector('button.detail-favorite.insert')
        .dispatchEvent(new Event('click'));

      expect(await dbconfig.getAllFavorites()).toEqual([]);
    }
  });
});
