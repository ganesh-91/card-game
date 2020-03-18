import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import CardsArena from './components/CardsArena/arena/arena';
import InfectionArena from './components/InfectionArena/arena/arena';
import GuideTheBallGame from './components/GuideTheBallGame/GuideTheBallGame'
// import Header from './components/header'
import './App.scss';

function App() {
  const [game, setGame] = useState('');
  const selectGame = (sg) => {
    setGame(sg);
  }
  return (
    <div className="App">
      {/* {game === '' && <div className="landing-screen">
        <div>
          Choose the Game
      </div>
        <ul>
          <li className="game-options" onClick={() => { selectGame('ZOMBIE') }}>Zombie Infection</li>
          <li className="game-options" onClick={() => { selectGame('CARDS') }}>Flip the Cards</li>
        </ul>
      </div>}
      {game === 'ZOMBIE' && <InfectionArena changeGame={setGame} />}
      {game === 'CARDS' && <CardsArena changeGame={setGame}/>} */}
      <GuideTheBallGame />
    </div>
  );
}

export default App;
