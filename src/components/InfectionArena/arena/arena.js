import React, { useState, useEffect } from 'react';
import { uniqueIdGenerator } from '../../../utils/uiGenerator'
import Header from '../header'

import './arena.scss';

const Arena = () => {
    const totalMoves = 10;
    const [slots, setSlots] = useState([]);
    const [targetColor, setTargetColor] = useState('');
    const [moves, setMoves] = useState(0);
    const [range, setRange] = useState(3)
    const colorSet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
    let colorArr = colorSet.slice(0, range);

    useEffect(() => {
        colorArr = colorSet.slice(0, range);
        let len = colorArr.length;

        setSlots([{
            id: 0,
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
    }, ([range]));

    useEffect(() => {
        if (targetColor !== '') {
            // let newSlots = slots.slice();
            if (moves <= totalMoves) {
                let newSlots = JSON.parse(JSON.stringify(slots));
                console.log('newSlots', newSlots)
                newSlots.forEach((el) => {
                    if (el.infected) {
                        // console.log(el)

                        // console.log(slots[((el.x + 1) * 10) + el.y]);
                        // console.log(slots[((el.x) * 10) + (el.y + 1)]);
                        // console.log(slots[((el.x - 1) * 10) + el.y]);
                        // console.log(slots[((el.x) * 10) + (el.y - 1)]);

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


                        // newSlots[((el.x + 1) * 10) + el.y].infected = true
                        // newSlots[((el.x) * 10) + (el.y + 1)].infected = true
                        // newSlots[((el.x - 1) * 10) + el.y].infected = true
                        // newSlots[((el.x) * 10) + (el.y - 1)].infected = true
                    }
                });
                setSlots(newSlots);
            }

        }
    }, ([targetColor]));

    console.log('object', slots)

    const targetChanged = () => {

    }

    return (
        <>
            {/* <Header
                wins={wins}
                player={start && player}
                turns={turns}
                attempts={attempts}
            /> */}
            <main>
                <div className="controls">
                    <div className="new-game">New Game</div>
                    <div>Moves <span className="moves">{moves}</span> / <span className="max-moves">30</span></div>
                </div>
                <div className="board">
                    {(moves <= totalMoves) ? slots.map((el) => {
                        return (<div className={"tile " + el.cl + " " + el.id} >{el.infected.toString()}</div>)
                    }) : 'Game over'}
                </div>
                <div className="colors">
                    {colorArr.map((el) => {
                        return (<div onClick={() => {
                            setMoves(moves + 1);
                            setTargetColor(el);
                        }} className={"color " + el} >{el}</div>)
                    })}
                </div>
                <div className="controls">
                    <div>Skill <span className="skill">0</span></div>
                    <div><input type="range" className="level" onChange={(e) => {
                        setRange(e.target.value)
                    }} value={range} min="3" max="10" /></div>
                </div>
                <div className='game-over'></div>
            </main>

        </>
    );
}

export default Arena;
