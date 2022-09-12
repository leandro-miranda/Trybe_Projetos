import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import PropTypes from 'prop-types';
import CategoriesList from './CategoriesList';
import {
  getCategories,
  getProductsFromQuery,
  getProductsFromCategory } from '../services/api';
import Card from './Card';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      query: '',
      searchList: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.categoriesAll();
  }

  categoriesAll = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  apiGetCategory = async (categoriaId) => {
    const categoryApi = await getProductsFromCategory(categoriaId);
    this.setState({
      searchList: categoryApi.results,
    });
  }

  inputOnChange = ({ target }) => {
    const { value } = target;
    this.setState({
      query: value,
    });
  }

  handleSearch = async () => {
    const { query } = this.state;
    const results = await getProductsFromQuery(query);
    this.setState({ searchList: results.results });
  }

  render() {
    const { query, searchList, categories } = this.state;
    const { addToCart } = this.props;
    return (
      <section className="home">
        <div className="header">
          <section className="searchHeader">
            <label
              htmlFor="home"
              data-testid="home-initial-message"
              className="inputHeader"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
              <input
                id="home"
                className="inputHeaderBox"
                type="text"
                name="home"
                value={ query }
                data-testid="query-input"
                onChange={ this.inputOnChange }
              />
            </label>
            <button
              type="button"
              data-testid="query-button"
              className="btnSearch"
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </section>
          <Link to="/cart" className="btnCart">
            <BsCart2 />
          </Link>
        </div>
        <div className="mainHome">
          <div className="categories">
            <CategoriesList
              apiGetCategory={ this.apiGetCategory }
              categories={ categories }
            />
          </div>
          <div>
            { searchList.length ? (
              <div className="cards">
                { searchList.map((list) => (
                  <div
                    key={ list.id }
                    data-testid="product"
                    className="card"
                  >
                    <Card
                      id={ list.id }
                      title={ list.title }
                      thumbnail={ list.thumbnail }
                      price={ list.price }
                    />
                    <button
                      data-testid="product-add-to-cart"
                      type="button"
                      className="btnAddCart"
                      onClick={ () => addToCart(list) }
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            ) : null }
          </div>
        </div>
      </section>
    );
  }
}

export default Home;

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
