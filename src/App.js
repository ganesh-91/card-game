import React from 'react';
import logo from './logo.svg';
import CardsArena from './components/CardsArena/arena/arena';
import InfectionArena from './components/InfectionArena/arena/arena';
// import Header from './components/header'
import './App.scss';

function App() {
  return (
    <div className="App">
      <InfectionArena />
      {/* <CardsArena /> */}
    </div>
  );
}

export default App;
