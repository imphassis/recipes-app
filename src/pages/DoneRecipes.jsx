import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import useLocalStorage from 'use-local-storage-state';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import '../styles/doneRecipes.scss';

export default function DoneRecipes() {
  const [foods, setFoods] = useState([]);
  const [doneRecipes] = useLocalStorage('doneRecipes', []);

  useEffect(() => {
    setFoods(doneRecipes);
  }, [doneRecipes]);

  const filterRecipes = (foodEl) => {
    if (foodEl) {
      const filteredRecipes = doneRecipes.filter(
        (food) => food.type === foodEl
      );
      return setFoods(filteredRecipes);
    }
    return setFoods(doneRecipes);
  };

  const cardsToRender = (cardsRender) =>
    cardsRender.length !== 0 &&
    cardsRender.map((el, index) => (
      <DoneRecipeCard key={index} {...{ el, index }} />
    ));

  return (
    <>
      <Header pageName="Receitas Feitas" />
      <main className="favorite-page">
        <Form className="filter-buttons">
          <Button
            variant="outline-secondary"
            data-testid="filter-by-all-btn"
            onClick={() => filterRecipes()}
          >
            All
          </Button>
          <Button
            variant="outline-primary"
            data-testid="filter-by-food-btn"
            onClick={() => filterRecipes('comida')}
          >
            Food
          </Button>
          <Button
            variant="outline-success"
            data-testid="filter-by-drink-btn"
            onClick={() => filterRecipes('bebida')}
          >
            Drinks
          </Button>
        </Form>
        <div className="done-recipe">{cardsToRender(foods)}</div>
      </main>
    </>
  );
}
