/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Button, Offcanvas } from 'react-bootstrap';
import { useLocalStorageState } from 'use-local-storage-state';
import { getSurpriseURL } from '../services/FoodSurprise';

export default function HamburguerMenu() {
  const history = useHistory();
  const [user] = useLocalStorageState('user');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const logInButton = () => {
    if (user) {
      return (
        <span>
          <i className="fad fa-user" />
          {user.email}
        </span>
      );
    }
    return (
      <Link to="/">
        <i className="fas fa-sign-in-alt" />
        Log in
      </Link>
    );
  };

  const exitButton = () => {
    localStorage.clear();
    history.push('/');
  };

  const handleRandomFood = async () => {
    const foodAleatory = await getSurpriseURL();
    const { category, id } = foodAleatory;
    history.push(`/${category}/${id}`);
  };

  return (
    <div>
      <Button variant="outline" onClick={ toggleShow } className="me-2">
        <i className="fas fa-bars" />
      </Button>
      <Offcanvas show={ show } onHide={ handleClose }>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {logInButton()}
            <span className="divisor" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to="/comidas">
            <i className="fad fa-salad" />
            Comidas
          </Link>
          <Link to="/bebidas">
            <i className="fad fa-cocktail" />
            Bebidas
          </Link>
          <Link to="/receitas-favoritas">
            <i className="fad fa-bookmark" />
            Favoritas
          </Link>
          <Link to="receitas-feitas">
            <i className="fad fa-clipboard-check" />
            Prontas
          </Link>
          <button
            type="button"
            className="offcanvas-button"
            onClick={ () => handleRandomFood() }
          >
            <i className="fad fa-random" />
            Aleatória
          </button>

          <Link to="/explorar">
            <i className="fad fa-compass" />
            Explorar
          </Link>
          {user && (
            <div className="Offcanvas-footer">
              <button
                className="exit-button"
                type="button"
                onClick={ exitButton }
              >
                <i className="fad fa-sign-out-alt" />
                Sair
              </button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
