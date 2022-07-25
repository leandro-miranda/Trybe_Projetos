import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { TiArrowBackOutline } from 'react-icons/ti';
import { getProductsFromProduct } from '../services/api';

class CardDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      details: [],
      listCart: [],
      inputEmail: '',
      inputTextarea: '',
      inputRadio: '',
      comentarios: [],
    };
  }

  componentDidMount() {
    this.getDetails();
    const { match: { params: { id } } } = this.props;
    this.getComentarios(id);
  }

  componentDidUpdate() {
    this.saveToCart();
  }

  getDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const results = await getProductsFromProduct(id);
    this.setState({
      details: results,
    });
  }

  saveCartItems = (listCart) => {
    localStorage.setItem('list', JSON.stringify(listCart));
  };

  saveToCart = () => {
    const { listCart } = this.state;
    if (listCart.length !== 0) {
      this.saveCartItems(listCart);
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  getComentarios = (id) => {
    const allComents = JSON.parse(localStorage.getItem('objectInput')) || [];
    const comentarios = allComents.filter((element) => (
      element.id === id
    ));
    this.setState({ comentarios });
  }

  handleSaveButton = (event) => {
    event.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { inputEmail, inputRadio, inputTextarea } = this.state;
    const objectInput = { inputEmail, inputRadio, inputTextarea, id };
    const prevObjectInput = JSON.parse(localStorage.getItem('objectInput'));
    if (prevObjectInput) {
      localStorage.setItem(
        'objectInput', JSON.stringify([...prevObjectInput, objectInput]),
      );
    } else {
      localStorage.setItem('objectInput', JSON.stringify([objectInput]));
    }
    this.getComentarios(id);
  }

  render() {
    const { details, comentarios } = this.state;
    const x6 = 6;
    const detailsPricex6 = (details.price / x6);
    const detailsPriceSlice = detailsPricex6.toFixed(2);
    const { addToCart } = this.props;
    const arrayAvaliation = ['1', '2', '3', '4', '5'];
    return (
      <main data-testid="product-detail-name">
        <section className="headerCardDetails">
          <Link to="/" className="btnReturn">
            <TiArrowBackOutline />
          </Link>
          <Link to="/cart" className="btnCart">
            <BsCart2 />
          </Link>
        </section>
        <p className="tituloDaPagina">Detalhes do Produto</p>
        <section className="productDetails">
          <img className="imgDetails" src={ details.thumbnail } alt={ details.title } />
          <div className="descritionProductDetails">
            <p>{details.title}</p>
            <p>{ `R$ ${details.price}`}</p>
            <p>{`ou 6x R$ ${detailsPriceSlice} sem juros`}</p>
            <p>Frete Grátis</p>
            <div>
              <p>{details.available_quantity}</p>
              <p>Unidades em Estoque</p>
            </div>
          </div>
          <div className="btnsDetails">
            <button
              type="button"
            >
              Compre Agora
            </button>
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              className="btnAddCart"
              onClick={ () => addToCart(details) }
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </section>
        <form className="formComments">
          <p>Insira o seu Comentário do Produto</p>
          <label htmlFor="email">
            Email:
            <input
              name="inputEmail"
              data-testid="product-detail-email"
              type="email"
              id="email"
              placeholder="Digite seu email"
              onChange={ this.handleChange }
            />
          </label>
          <div>
            {arrayAvaliation.map((index) => (
              <label htmlFor={ index } key={ index }>
                {index}
                <input
                  name="inputRadio"
                  type="radio"
                  id={ index }
                  value={ index }
                  data-testid={ `${index}-rating` }
                  onChange={ this.handleChange }
                />
              </label>
            ))}
          </div>
          <textarea
            name="inputTextarea"
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
          />
          <button
            data-testid="submit-review-btn"
            type="submit"
            id="button"
            onClick={ this.handleSaveButton }
          >
            Enviar comentário
          </button>
        </form>
        <div>
          {comentarios.length
            ? (comentarios.map((comentario) => (
              <div key={ comentario.inputEmail }>
                <p>{comentario.inputEmail}</p>
                <p>{comentario.inputRadio}</p>
                <p>{comentario.inputTextarea}</p>
              </div>
            ))
            ) : null}
        </div>
      </main>
    );
  }
}

CardDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default CardDetails;
