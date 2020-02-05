import React from 'react';
import logo from './logo.svg';
import Arena from './components/arena/arena';
import Header from './components/header'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Arena />
    </div>
  );
}

export default App;
