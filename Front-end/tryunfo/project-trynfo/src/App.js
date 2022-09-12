import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import CardList from './components/CardList';
import './styles/form.css';
import './styles/button.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '""',
      cardRare: 'Normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      saveCards: [],
    };
  }

  trunfoInCards = () => {
    const { saveCards } = this.state;
    if (saveCards.length !== 0) {
      return saveCards.some((card) => card.cardTrunfo);
    }
    return false;
  };

  validationButton = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const maxAttr = 90;
    const minAttr = 0;
    const maxSumAttr = 210;

    const empty = cardName !== '' && cardDescription !== '' && cardImage !== '';

    const sumAttr = Number(cardAttr1)
      + Number(cardAttr2) + Number(cardAttr3) <= maxSumAttr;

    const maxValidationAttr = Number(cardAttr1) <= maxAttr
      && Number(cardAttr2) <= maxAttr
      && Number(cardAttr3) <= maxAttr;

    const minValidationAttr = Number(cardAttr1) >= minAttr
      && Number(cardAttr2) >= minAttr
      && Number(cardAttr3) >= minAttr;

    if (empty && sumAttr && maxValidationAttr && minValidationAttr) {
      return false;
    }
    return true;
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      () => this.setState({
        isSaveButtonDisabled: this.validationButton(),
      }),
    );
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    this.setState(
      (prev) => ({
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardRare: 'Normal',
        cardTrunfo: false,
        saveCards: [
          ...prev.saveCards,
          {
            cardName,
            cardDescription,
            cardAttr1,
            cardAttr2,
            cardAttr3,
            cardImage,
            cardRare,
            cardTrunfo,
          },
        ],
      }),
      () => this.setState({ hasTrunfo: this.trunfoInCards() }),
    );
  };

  deleteButtonClick = (cards) => {
    this.setState(
      (prev) => ({
        saveCards: prev.saveCards.filter((card) => card.cardName !== cards),
      }),
      () => this.setState({ hasTrunfo: this.trunfoInCards() }),
    );
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      saveCards,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <div>
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
        </div>
        <h2>Lista de cartas</h2>
        <div>
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            deleteButtonClick={ this.deleteButtonClick }
            preview={ false }
          />
        </div>
        <h2>Todas as Cartas</h2>
        <div>
          <CardList
            saveCards={ saveCards }
            deleteButtonClick={ this.deleteButtonClick }
            preview
          />
        </div>
      </div>
    );
  }
}

export default App;
