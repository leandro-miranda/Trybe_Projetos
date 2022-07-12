import React from 'react';
import Title from './Title';
import PlanetCard from './PlanetCard';
import planets from '../data/planets';
import './solarSystem.css';

class SolarSystem extends React.Component {
  render() {
    return (
      <div className="solar-system" data-testid="solar-system">
        <Title headline="Planetas" />
        <div className="system-solar">
          {
            planets.map((element) => (
              <PlanetCard
                key={ element.name }
                planetName={ element.name }
                planetImage={ element.image }
              />))
          }
        </div>
      </div>
    );
  }
}

export default SolarSystem;
