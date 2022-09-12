import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const stringLocalStorage = JSON.parse(localStorage.getItem('user'));
  const handleClick = () => {
    localStorage.clear();
  };
  return (
    <div>
      <Header title="Profile" bool={ false } />
      <div>
        {stringLocalStorage && (
          <h3 data-testid="profile-email">
            { stringLocalStorage.email }
          </h3>) }
        <div>
          <Link to="/done-recipes">
            <button
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes

            </button>
          </Link>
        </div>
        <div>
          <Link to="/favorite-recipes">
            <button
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes

            </button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <button
              data-testid="profile-logout-btn"
              type="button"
              onClick={ handleClick }
            >
              Logout
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
