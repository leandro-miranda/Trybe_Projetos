import React from 'react';
import PropTypes from 'prop-types';

class CategoriesList extends React.Component {
  render() {
    const { apiGetCategory, categories } = this.props;
    return (
      <div className="categories">
        <p>Categorias</p>
        { categories.map((categoria) => (
          <button
            key={ categoria.id }
            className="btnCategory"
            type="button"
            data-testid="category"
            onClick={ () => (
              apiGetCategory(categoria.id)
            ) }
          >
            { categoria.name }
          </button>
        ))}
      </div>
    );
  }
}

export default CategoriesList;

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  apiGetCategory: PropTypes.func.isRequired,
};
