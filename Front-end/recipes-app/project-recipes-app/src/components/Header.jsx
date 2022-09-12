import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title, bool, nameBtn }) {
  const [searchDisabled, setSearchDisabled] = useState(true);

  const handleSearch = () => {
    setSearchDisabled(!searchDisabled);
  };

  return (
    <header className="header-container">
      <div className="icon-profile">
        <Link to="/profile">
          <input
            type="image"
            src={ icon }
            data-testid="profile-top-btn"
            alt="icone de perfil"
          />
        </Link>
      </div>

      <h1 data-testid="page-title">{title}</h1>

      <div className="icon-search">
        {bool && (
          <button type="button" onClick={ handleSearch }>
            <img
              type="image"
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="icone de pesquisa"
            />
          </button>)}
        <section className="search-bar">
          {!searchDisabled && (
            <SearchBar nameBtn={ nameBtn } />
          )}
        </section>
      </div>
    </header>
  );
}

Header.propTypes = {
  bool: PropTypes.bool.isRequired,
  nameBtn: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  nameBtn: '',
};

export default Header;
