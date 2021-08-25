import React from 'react';
import Header from '../components/Header';
import '../styles/Main.css';
import FilterButtons from '../components/FilterButtons';
import FoodCard from '../components/FoodCard';

export default function Bebidas() {
  return (
    <>
      <Header pageName="Bebidas" renderButton />
      <main className="food-page">
        <FilterButtons type="drinks" />
        <FoodCard type="drinks" />
      </main>

    </>
  );
}
