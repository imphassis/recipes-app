import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { sendFormData } from '../Redux/reducers/recipes';

function SearchBar() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const submitForm = (data) => {
    dispatch(sendFormData(data));
  };

  const showForm = () => (
    <Form onSubmit={ handleSubmit(submitForm) } className="search-form">
      <Form.Group className="search-group">
        <Form.Control
          name="ingrediente"
          className="search-input"
          placeholder="Buscar Receita"
          { ...register('query') }
        />
        <button type="submit" variant="outline-secondary">
          <i className="fad fa-search" />
        </button>
      </Form.Group>
      <Form.Group className="checkbox-search">
        <Form.Label>
          <Form.Check
            inline
            value="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
            { ...register('type') }
          />
          Ingrediente
        </Form.Label>
        <Form.Label>
          <Form.Check
            inline
            value="name"
            data-testid="name-search-radio"
            type="radio"
            { ...register('type') }
          />
          Nome
        </Form.Label>
      </Form.Group>
    </Form>
  );

  return showForm();
}

export default SearchBar;
