import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import '../styles/doneRecipes.scss';
import useLSHook from '../components/Hooks/useLSHook';
import { updateFavorites } from '../Redux/reducers/user';

export default function FavoritePage() {
  const dispatch = useDispatch();
  const [favoriteRecipes] = useLSHook();
  const recipes = useSelector((state) => state.user.favoriteRecipes);

  useEffect(() => {
    if (favoriteRecipes.length) {
      dispatch(updateFavorites(favoriteRecipes));
    }
  }, [dispatch, favoriteRecipes]);

  const filterCards = (foodEl) => {
    if (foodEl) {
      const filteredRecipes = favoriteRecipes.filter(
        (food) => food.type === foodEl,
      );
      return dispatch(updateFavorites(filteredRecipes));
    }
    return dispatch(updateFavorites(favoriteRecipes));
  };

  const cardsToRender = (cardsRender) => cardsRender
    && cardsRender.map((el, index) => (
      <FavoriteCard key={ index } { ...{ el, index } } />
    ));

  return (
    <>
      <Header pageName="Receitas Favoritas" />
      <main className="favorite-page">
        <Form className="filter-buttons">
          <Button
            variant="outline-secondary"
            data-testid="filter-by-all-btn"
            onClick={ () => filterCards() }
          >
            All
          </Button>
          <Button
            variant="outline-primary"
            data-testid="filter-by-food-btn"
            onClick={ () => filterCards('comida') }
          >
            Food
          </Button>
          <Button
            variant="outline-success"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterCards('bebida') }
          >
            Drinks
          </Button>
        </Form>
        <div className="done-recipe">{cardsToRender(recipes)}</div>
      </main>
    </>
  );
}
