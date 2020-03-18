import React, { useState, useEffect } from 'react';
import './GuideTheBallGame.scss';

const GuideTheBallGame = () => {
    let blocks = [];
    let memo = [];

    while (memo.length !== 16) {
        const inx = Math.floor(Math.random() * (16)) + 1;
        if (!memo.includes(inx)) {
            memo.push(inx);
        }
    }
    for (let i = 1; i <= 16; i++) {

        console.log('memo', memo)
        if (16 === memo[i]) {

            blocks.push({
                id: i,
                inx: memo[i - 1],
                empty: true
            })
        } else {

            blocks.push({
                id: i,
                inx: memo[i - 1],
                empty: false
            })
        }
    }
    const returnNeighbors = (node) => {
        let obj = {
            up: "",
            down: "",
            left: "",
            right: ""
        }
        if (node - 4 >= 0) { obj.up = node - 4; }
        if (node + 4 <= 15) { obj.down = node + 4; }
        if (node % 4 !== 0) { obj.right = node + 1; }
        if (node % 4 !== 1) { obj.left = node - 1; }
        console.log('evn', obj)
        return obj;
    }

    const changeBlock = (id) => {
        let neighborNodes = returnNeighbors(id);


    }

    return (
        <main className="game-wrapper">
            <div className="game-arena">
                {blocks.map((el) => {
                    return (<div key={Math.random().toString()}
                        onClick={() => changeBlock(el.id)}
                        value={el.id}
                        className={`block ${el.id} ${el.empty}`} >{el.inx}</div>)
                })}
            </div>
        </main>
    )


}

export default GuideTheBallGame
