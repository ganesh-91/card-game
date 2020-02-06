import React from 'react';
import CountdownTimer from './CountdownTimer';

const Header = (props) => {

  return (
    <header className="App-header">
      <div className="header-main-div">
        {/* <div>turns:</div> */}
        <div>Time:<span className="score-val">{props.attempts}</span></div>
        <div>attempts:<span className="score-val">{props.attempts}</span></div>
        <div>wins:<span className="score-val">{props.wins}</span></div>
        <div>player:<span className="score-val">{props.player}</span></div>
        {/* <div>player:<span className="ply-name">ganesh</span></div> */}
      </div>
      <div className="header-counter-div">
        <CountdownTimer />
      </div>
    </header>
  );
}

export default Header;
