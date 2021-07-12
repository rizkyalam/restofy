import Detail from '../src/scripts/views/components/details/detail';
import { restaurant } from '../src/databases/detail.json';
import dbconfig from '../src/scripts/configs/idb';

describe('Unliking a Restaurant', () => {
  if (!customElements.get('detail-restaurant')) {
    customElements.define('detail-restaurant', Detail);
  }

  const container = () => {
    document.body.innerHTML = '<detail-restaurant data-mode="testing"></detail-restaurant>';
  };

  beforeEach(async () => {
    const datadb = await dbconfig.getFavorite(restaurant.id);

    if (!datadb) {
      await dbconfig.putFavorite(restaurant);
    }

    container();
  });

  it(
    'should display unlike widget when the restaurant has been liked',
    async () => {
      expect(document.querySelector('button.detail-favorite'))
        .toBeTruthy();
    },
  );

  it(
    'should not display like widget when the restaurant has been liked',
    async () => {
      expect(document.querySelector('button.detail-favorite.insert'))
        .toBeFalsy();
    },
  );

  it('should be able to remove liked restaurant from the list', async () => {
    document.querySelector('button.detail-favorite')
      .dispatchEvent(new Event('click'));

    await dbconfig.deleteFavorite(restaurant.id);

    expect(await dbconfig.getAllFavorites()).toEqual([]);
  });

  it(
    'should not throw error if the unliked restaurant is not in the list',
    async () => {
      await dbconfig.deleteFavorite(restaurant.id);

      document.querySelector('button.detail-favorite.delete')
        .dispatchEvent(new Event('click'));

      expect(await dbconfig.getAllFavorites()).toEqual([]);
    },
  );
});
