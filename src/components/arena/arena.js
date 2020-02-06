import React, { useState, useEffect } from 'react';
import { uniqueIdGenerator } from '../../utils/uiGenerator'
import Header from '../header'

import './arena.scss';

const Arena = () => {
    const [attempts, setAttempts] = useState(0);
    const [start, setStart] = useState(false);
    const [player, setPlayer] = useState('');
    // const [players, setPlayers] = useState([{ name: 'player1', label: '', no: 0 }, { name: 'player2', label: '', no: 0 }]);
    const [showPopup, setShowPopup] = useState(true);
    const [className, setClassName] = useState([]);
    const [timer, setTimer] = useState(10 + ":" + 1);
    const [wins, setWins] = useState(0);
    const [selectedCards, setSelectedCards] = useState([]);
    const [arr, setArr] = useState([]);
    const [turns, setTurns] = useState(0);
    const [turnedCards, setTurnedCards] = useState([]);
    useEffect(() => {
        const vr = 12;
        let uniqueIdArr = [''];
        let uniqueIdArrLog = [''];
        for (let ind = 1; ind < ((vr * 2) + 1); ind++) {
            let uniqueId = '';

            while (uniqueIdArr.includes(uniqueId)) {
                uniqueId = Math.floor(Math.random() * (vr * 2)) + 1
            }
            uniqueIdArr.push(uniqueId);

            const cardUniqueId = (uniqueIdArr[ind] > vr) ? uniqueIdArr[ind] - vr : uniqueIdArr[ind];
            setArr(oldArr => [...oldArr, {
                id: uniqueIdGenerator(),
                name: "",
                cardUrl: "",
                cardUniqueId
            }]);
            if (!uniqueIdArrLog.includes(cardUniqueId)) {
                uniqueIdArrLog.push(cardUniqueId)
            }
        }
    }, ([]));

    const cardClick = (el) => {
        if (turns >= 2) {
            setTurns(1);
            setClassName([el.id]);
            setSelectedCards([el.cardUniqueId]);
        } else {
            setTurns(turns + 1);
            setClassName(oldClassName => [...oldClassName, el.id]);
            setSelectedCards(oldSelectedCards => [...oldSelectedCards, el.cardUniqueId]);
            if (selectedCards[0] === el.cardUniqueId) {
                // console.log('win');
                setWins(wins + 1)
                setTurnedCards(oldTurnedCards => [...oldTurnedCards, el.cardUniqueId])
            }
        }
        setAttempts(attempts + 1);
    }

    return (
        <>
            <Header
                wins={wins}
                player={start && player}
                turns={turns}
                attempts={attempts}
            />
            {showPopup && <div id="myModal" className="modal">
                <div className="modal-content">
                    {/* <span onClick={() => { setShowPopup(false); }} className="close">&times;</span> */}
                    <input className="input" value={player} onChange={(e) => { setPlayer(e.target.value) }} />
                    <button className="btn" onClick={() => { setStart(true); setShowPopup(false) }}>Start</button>
                </div>
            </div>}
            <div className="arena-wrapper">
                {arr.map((el) => {
                    return (
                        <div key={el.id} onClick={() => { cardClick(el) }} className={"flip-card " + turns + el.cardUniqueId}>
                            <div className={"flip-card-inner " + ((className.includes(el.id) || (turnedCards.includes(el.cardUniqueId))) ? "card-flip" : "")}>
                                <div className="flip-card-front">
                                </div>
                                <div className="flip-card-back">
                                    {el.cardUniqueId}
                                </div>
                            </div>
                        </div >
                    )
                })}
            </div >
        </>
    );
}

export default Arena;
