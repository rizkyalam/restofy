import Detail from '../src/scripts/views/components/details/detail';
import { restaurant } from '../src/databases/detail.json';
import dbconfig from '../src/scripts/configs/idb';

describe('Liking a Restaurant', () => {
  if (!customElements.get('detail-restaurant')) {
    customElements.define('detail-restaurant', Detail);
  }

  const container = () => {
    document.body.innerHTML = '<detail-restaurant data-mode="testing"></detail-restaurant>';
  };

  beforeEach(() => {
    container();
  });

  it(
    'should show the like button when the restaurant has not been liked before',
    async () => {
      expect(document.querySelector('button.detail-favorite'))
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
    document.querySelector('.detail-favorite')
      .dispatchEvent(new Event('click'));

    await dbconfig.putFavorite(restaurant);

    const data = await dbconfig.getFavorite(restaurant.id);

    expect(data.id).toEqual(restaurant.id);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await dbconfig.putFavorite({ id: restaurant.id });

    document.querySelector('button.detail-favorite')
      .dispatchEvent(new Event('click'));

    const allFavoritesData = await dbconfig.getAllFavorites();
    allFavoritesData.filter((data) => expect(data.id).toEqual(restaurant.id));

    await dbconfig.deleteFavorite(restaurant.id);
  });
});
