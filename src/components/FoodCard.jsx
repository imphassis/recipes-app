import React, { useCallback, useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import _ from 'lodash';
import getFood from '../services/SearchRecipe';

export default function FoodCard({ type }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const { cards, formInfo, selectedCategory } = recipes;

  const redirect = useMemo(() => {
    const obj = {
      meals: 'comidas',
      drinks: 'bebidas',
    };
    return obj[type];
  }, [type]);

  useEffect(() => {
    const getCards = () => {
      if (!cards[type].length || formInfo || selectedCategory !== type) {
        dispatch(getFood({ formInfo, type }));
      }
    };

    getCards();
  }, [dispatch, formInfo, selectedCategory, type]);

  const getId = useCallback(
    () => _.find(_.find(cards[type]), (v, k) => /id/i.test(k)),
    [cards, type],
  );

  useEffect(() => {
    if (cards[type].length === 1) {
      history.push(`/${redirect}/${getId()}`);
    }
  }, [cards, getId, history, redirect, type]);

  const cardsToRender = (cardsRender) => cardsRender.map(
    (
      {
        idMeal,
        strMeal,
        strMealThumb,
        strCategory,
        idDrink,
        strDrinkThumb,
        strIngredient1,
        strIngredient2,
        strIngredient3, strDrink,
      },
      index,
    ) => (
      <Link
        to={ `/${redirect}/${idDrink || idMeal}` }
        key={ index }
        className="card"
      >
        <Card.Img
          variant="top"
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal }
        />
        <Card.Body>
          <p>
            {strMeal || strDrink}
            <br />
            <span>{strCategory}</span>
          </p>
        </Card.Body>
        {strIngredient1
         && (
           <Card.Footer>
             <p className="ingredient-demo">
               {`${strIngredient1} - ${strIngredient2} ${
                 strIngredient3 && strIngredient3.length < 10
                   ? `-  ${strIngredient3}`
                   : ''
               }`}
             </p>
           </Card.Footer>)}
      </Link>
    ),
  );

  const getCards = () => {
    if (cards) {
      return cardsToRender(cards[type]);
    }
  };

  return <CardGroup className="food-cards">{getCards()}</CardGroup>;
}

FoodCard.propTypes = {
  type: propTypes.string.isRequired,
};
