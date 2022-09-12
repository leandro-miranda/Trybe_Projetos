import React from 'react';
import PropTypes from 'prop-types';
import './solarSystem.css';

class PlanetCard extends React.Component {
  render() {
    const { planetName, planetImage } = this.props;
    const alt = `Planeta ${planetName}`;
    return (
      <div data-testid="planet-card" className="planet">
        <p data-testid="planet-name" className="tooltiptext">{planetName}</p>
        <img src={ planetImage } alt={ alt } />
      </div>
    );
  }
}

PlanetCard.propTypes = {
  planetName: PropTypes.string.isRequired,
  planetImage: PropTypes.string.isRequired,
};

export default PlanetCard;
