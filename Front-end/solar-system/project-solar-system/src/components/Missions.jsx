import React from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissionCard from './MissionCard';
import './missions.css';

class Missions extends React.Component {
  render() {
    return (
      <div className="mission">
        <Title headline="Missões" />
        <div data-testid="missions" className="missions">
          {missions.map((element) => (
            <MissionCard
              key={ element.name }
              name={ element.name }
              year={ element.year }
              country={ element.country }
              destination={ element.destination }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Missions;
