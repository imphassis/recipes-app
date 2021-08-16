import _ from 'lodash';

const fetchSurprise = async (food) => {
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';

  const types = {
    meals: URL_FOOD,
    drinks: URL_DRINK,
  };

  const response = await fetch(types[food]);
  const json = await response.json();

  return json[food];
};

export default fetchSurprise;

export const getSurpriseURL = async () => {
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';

  const types = {
    meals: URL_DRINK,
    drinks: URL_FOOD,
  };

  const rIndex = Math.floor(Math.random() * 2);
  const randomURL = Object.keys(types)[rIndex];

  const response = await fetch(types[randomURL]);
  const json = await response.json();
  const t = _.merge(...Object.values(json)[0], {});
  const randomFood = {
    id: _.find(t, (v, k) => /idMeal/gi.test(k) || /idDrink/gi.test(k)),
    category: t.idMeal ? 'comidas' : 'bebidas',
  };

  return randomFood;
};
