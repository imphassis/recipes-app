import React from 'react';
import Header from '../components/Header';
import '../styles/Ingredients.scss';
import FoodIngredients from '../components/FoodIngredients';

export default function MealtIngredients() {
  return (
    <>
      <Header pageName="Explorar Ingredientes" />
      <main className="ingredient-list">
        <FoodIngredients type="meals" />
      </main>
    </>
  );
}
