import React from 'react';
import FoodDetails from '../components/FoodDetails';
import Header from '../components/Header';

export default function DrinkDetails() {
  return (
    <>
      <Header />
      <main className="food-page">
        <FoodDetails type="drinks" />
      </main>
    </>
  );
}
