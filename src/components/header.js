import React from 'react';
import CountdownTimer from '../components/CountdownTimer';

const Header = () => {

  return (
    <header className="App-header">
      <div className="header-main-div">
        {/* <div>turns:</div> */}
        <div>Timer:<span className="score-val">0</span></div>
        <div>attempts:<span className="score-val">0</span></div>
        {/* <div>wins:<span className="score-val">0</span></div> */}
        <div>player:<span className="score-val">0</span></div>
        {/* <div>player:<span className="ply-name">ganesh</span></div> */}
      </div>
      <div className="header-counter-div">
        <CountdownTimer />
      </div>
    </header>
  );
}

export default Header;
