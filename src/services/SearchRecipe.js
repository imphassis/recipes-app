/* eslint-disable max-len */
import { fetchFoodCards } from '../Redux/reducers/recipes';

const getFood = ({ formInfo, type }) => async (dispatch) => {
  const { query } = formInfo;

  const URL = (() => {
    const database = {
      meals: {
        ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query || ''}`,
        name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${query || ''}`,
      },
      drinks: {
        ingredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query || ''}`,
        name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query || ''}`,
      },
    };
    return formInfo.type ? (database[type][formInfo.type]) : database[type].name;
  })();

  const fetchData = async () => {
    const empty = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    const maxCards = 12;
    const response = await fetch(URL);
    try {
      const data = await response.json();
      const defaultList = data[type] && data[type].filter((item, index) => index < maxCards);
      if (defaultList === null && formInfo) {
        return alert(empty);
      }
      const list = formInfo ? data[type] : defaultList;
      dispatch(fetchFoodCards({ filtered: list, cat: type }));
    } catch (error) {
      // throw new Error(error);
      console.log(error);
      dispatch(fetchFoodCards({ filtered: [], cat: type }));
    }
  };
  return fetchData();
};

export default getFood;
