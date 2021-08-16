import React from 'react';
import FoodDetails from '../components/FoodDetails';
import Header from '../components/Header';

export default function MealDetails() {
  return (
    <>
      <Header />
      <main className="food-page">
        <FoodDetails type="meals" />
      </main>
    </>
  );
}
