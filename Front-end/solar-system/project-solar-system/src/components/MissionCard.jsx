import React from 'react';
import PropTypes from 'prop-types';
import './missionCard.css';

class MissionCard extends React.Component {
  render() {
    const { name, year, country, destination } = this.props;
    return (
      <div data-testid="mission-card" className="missionCard">
        <p data-testid="mission-name" className="missionName">
          {name}
        </p>
        <hr />
        <p data-testid="mission-year">
          {year}
        </p>
        <p data-testid="mission-country">
          {country}
        </p>
        <p data-testid="mission-destination">
          {destination}
        </p>
      </div>
    );
  }
}

MissionCard.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

export default MissionCard;
