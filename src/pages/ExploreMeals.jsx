import React from 'react';
import Header from '../components/Header';
import ExploreButtons from '../components/ExploreButtons';

function ExploreFood() {
  return (
    <>
      <Header pageName="Explorar Comidas" />
      <main>
        <ExploreButtons type="meals" />
      </main>
    </>
  );
}

export default ExploreFood;
