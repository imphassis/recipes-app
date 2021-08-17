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
    const maxCards = 12;
    // const URL = food ? database[db][type] : database[db].name;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    const filtered = data[type] && data[type].filter((item, index) => index < maxCards);
    if (filtered === null && formInfo) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    try {
      const list = formInfo ? data[type] : filtered;
      dispatch(fetchFoodCards({ filtered: list, cat: type }));
    } catch (error) {
      throw new Error(error);
    }
  };
  return fetchData();
};

export default getFood;
