import React, { useState, useEffect } from 'react';
import { uniqueIdGenerator } from '../../../utils/uiGenerator'
import Header from '../header'

import './arena.scss';

const Arena = () => {
    const [winEvn, setWinEvn] = useState(false);
    const [slots, setSlots] = useState([]);
    const [targetColor, setTargetColor] = useState('');
    const [moves, setMoves] = useState(0);
    const [range, setRange] = useState(3)
    const [totalMoves, setTotalMoves] = useState(range * 3);
    const colorSet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
    let colorArr = colorSet.slice(0, range);

    const render = () => {
        colorArr = colorSet.slice(0, range);
        let len = colorArr.length;

        setSlots([{
            id: 0,
            genZero: true,
            cl: colorArr[(Math.floor(Math.random() * (len)) + 1) - 1],
            x: 0, y: 0, infected: true
        }])

        // console.log(colorArr)
        for (let inx = 1; inx < 100; inx++) {
            const uId = Math.floor(Math.random() * (len)) + 1;
            setSlots(oldSlots => [...oldSlots, {
                id: inx,
                cl: colorArr[uId - 1],
                x: parseInt(inx / 10),
                y: ((inx % 10)),
                infected: inx === 0 ? true : false
            }])
        }
    }

    const resetGame = () => {
        setWinEvn(false)
        setSlots([]);
        setMoves(0);
    }

    useEffect(() => {
        render();
    }, ([range]));

    useEffect(() => {
        if (targetColor !== '') {
            // let newSlots = slots.slice();
            if (moves < totalMoves) {
                let newSlots = JSON.parse(JSON.stringify(slots));
                newSlots.forEach((el) => {
                    if (el.infected) {
                        newSlots[el.id].cl = targetColor;
                        if (el.x < 9) {
                            if (newSlots[((el.x + 1) * 10) + el.y].cl === targetColor) {
                                newSlots[((el.x + 1) * 10) + el.y].infected = true;
                                newSlots[((el.x + 1) * 10) + el.y].cl = targetColor;
                            }
                        }

                        if (el.y < 9) {
                            if (newSlots[((el.x) * 10) + (el.y + 1)].cl === targetColor) {
                                newSlots[((el.x) * 10) + (el.y + 1)].infected = true;
                                newSlots[((el.x) * 10) + (el.y + 1)].cl = targetColor;
                            }
                        }

                        if (el.x > 0) {
                            if (newSlots[((el.x - 1) * 10) + el.y].cl === targetColor) {
                                newSlots[((el.x - 1) * 10) + el.y].infected = true;
                                newSlots[((el.x - 1) * 10) + el.y].cl = targetColor;
                            }
                        }

                        if (el.y > 0) {
                            if (newSlots[((el.x) * 10) + (el.y - 1)].cl === targetColor) {
                                newSlots[((el.x) * 10) + (el.y - 1)].infected = true;
                                newSlots[((el.x) * 10) + (el.y - 1)].cl = targetColor;
                            }
                        }
                    }
                });
                setSlots(newSlots);
                let len = newSlots.filter((el) => {
                    return !el.infected;
                }).length
                if (len <= 0) {
                    setWinEvn(true)
                }
            }

        }
    }, ([targetColor]));

    const newGame = () => {
        resetGame();
        render();
    }

    const rangeChanged = (e) => {
        setRange(e.target.value)
        setTotalMoves(e.target.value * 3)
        newGame();
    }

    const targetChanged = (el) => {
        if (moves < totalMoves) {
            setMoves(moves + 1);
            setTargetColor(el);
        }
    }

    return (
        <>
            <main>
                <div className="controls">
                    <div onClick={newGame} className="new-game">New Game</div>
                    <div>Moves <span className="moves">{moves}</span> / <span className="max-moves">{totalMoves}</span></div>
                </div>
                <div className="arrow">
                    {(moves <= 0) && <div className="arrow-img">
                    </div>}
                    <div className="infected-text">
                        {moves <= 0 ? "Infected" : "Infection Spread"}
                    </div>
                </div>
                <div className="board">
                    {((moves >= totalMoves) && !winEvn) && <div className="game-over">Game over</div>}
                    {winEvn && <div className="game-over">WIN</div>}
                    {slots.map((el, i) => {
                        return (<div className={"tile " + el.cl + " " + i + " " + ((el.genZero && moves <= 0) ? "gen-zero" : "")} />)
                    })}
                </div>
                <div className="colors">
                    {colorArr.map((el) => {
                        return (<div onClick={() => {
                            ((moves < totalMoves) && !winEvn) && targetChanged(el)
                        }} className={"color " + el} />)
                    })}
                </div>
                <div className="controls">
                    <div>Level <span className="skill">{range - 2}</span></div>
                    <div>
                        <input type="range" className="level" onChange={(e) => {
                            rangeChanged(e)
                        }} value={range} min="3" max="10" />
                    </div>
                </div>
            </main>

        </>
    );
}

export default Arena;
