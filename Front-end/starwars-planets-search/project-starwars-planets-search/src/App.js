import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import './App.css';
import StarWars from './component/StarWars';

function App() {
  return (
    <StarWarsProvider>
      <StarWars />
    </StarWarsProvider>
  );
}

export default App;
