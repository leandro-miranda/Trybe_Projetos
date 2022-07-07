import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/form.css';
import '../styles/button.css';

export default class Form extends Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      onInputChange, onSaveButtonClick } = this.props;

    return (
      <form>
        <h1 className="title">Adicionar nova carta</h1>
        <label htmlFor="name" className="label-name">
          Nome:
          <input
            className="input-name"
            type="text"
            data-testid="name-input"
            name="cardName"
            id="name"
            placeholder="Digite o nome da carta"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="description" className="label-description">
          Descrição:
          <textarea
            className="input-textarea"
            type="textarea"
            data-testid="description-input"
            name="cardDescription"
            id="description"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <div>
          <label htmlFor="attr1">
            Habilidade:
            <input
              type="number"
              data-testid="attr1-input"
              name="cardAttr1"
              id="attr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr2">
            Força:
            <input
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
              id="attr2"
              data-testid="attr2-input"
              type="number"
            />
          </label>
          <label htmlFor="attr3">
            Vida:
            <input
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
              id="attr3"
              data-testid="attr3-input"
              type="number"
            />
          </label>
        </div>
        <label htmlFor="image">
          Imagem:
          <input
            placeholder="Digite o endereço da imagem"
            name="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
            id="image"
            data-testid="image-input"
            type="text"
          />
        </label>
        <label htmlFor="rare">
          Raridade:
          <select
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
            id="rare"
            data-testid="rare-input"
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>
        {hasTrunfo ? (
          'Você já tem um Super Trunfo em seu baralho'
        ) : (
          <label htmlFor="trunfo">
            <input
              checked={ cardTrunfo }
              onChange={ onInputChange }
              type="checkbox"
              name="cardTrunfo"
              id="trunfo"
              data-testid="trunfo-input"
            />
            <span>Super Trunfo!</span>
          </label>
        )}
        <button
          className="button"
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
