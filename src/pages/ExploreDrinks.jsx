import React from 'react';
import Header from '../components/Header';
import ExploreButtons from '../components/ExploreButtons';

function ExploreDrink() {
  return (
    <>
      <Header pageName="Explorar Bebidas" />
      <main>
        <ExploreButtons type="drinks" />
      </main>
    </>
  );
}

export default ExploreDrink;
