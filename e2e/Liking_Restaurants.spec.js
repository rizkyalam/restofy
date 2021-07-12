const assert = require('assert');

const likeRestaurant = async (I) => {
  I.amOnPage('/');

  // move to detail restaurant
  I.seeElement('.list-card-detail a');
  const title = await I.grabTextFrom(locate('.list-card-title').first());
  const firstRestaurantTitle = title;
  I.click(locate('.list-card-detail').first());

  // insert to favorite
  I.seeElement('.detail-favorite');
  I.click('.detail-favorite');

  I.amOnPage('/#/favorite');

  I.seeElement('.list-card');
  const firstRestaurantFavoriteTitle = title;

  assert.strictEqual(firstRestaurantTitle, firstRestaurantFavoriteTitle);
};

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty liked restaurant', ({ I }) => {
  I.seeElement('error-data');
});

Scenario('Liking a restaurant', async ({ I }) => {
  await likeRestaurant(I);
});

Scenario('Unliking a restaurant', async ({ I }) => {
  await likeRestaurant(I);

  // move to detail restaurant
  I.seeElement('.list-card-detail');
  I.click(locate('.list-card-detail a').first());

  // Remove from favorite
  I.seeElement('.detail-favorite');
  I.click('.detail-favorite');

  I.amOnPage('/#/favorite');
  I.seeElement('error-data');
});
