import React, { useState, useEffect } from 'react';
import './GuideTheBallGame.scss';

const GuideTheBallGame = () => {
    let [blocks, setBlocks] = useState([]);
    let memo = [];

    while (memo.length !== 16) {
        const label = Math.floor(Math.random() * (16)) + 1;
        if (!memo.includes(label)) {
            memo.push(label);
        }
    }

    const initArena = () => {
        let arr = [];
        for (let i = 0; i < 16; i++) {

            if (16 === memo[i]) {
                arr.push({
                    id: i + 1,
                    label: memo[i],
                    empty: true
                })
            } else {
                arr.push({
                    id: i + 1,
                    label: memo[i],
                    empty: false
                })
            }
        }
        setBlocks(arr)
    }

    useEffect(() => {
        initArena();
    }, [])

    const returnNeighbors = (node) => {
        let obj = {
            up: "",
            down: "",
            left: "",
            right: ""
        };
        let dim = [];
        if (node - 4 >= 0) { obj.up = node - 4; dim.push(node - 4) }
        if (node + 4 <= 15) { obj.down = node + 4; dim.push(node + 4) }
        if (node % 4 !== 0) { obj.right = node + 1; dim.push(node + 1) }
        if (node % 4 !== 1) { obj.left = node - 1; dim.push(node - 1) }
        return dim;
    }

    const changeBlock = (id) => {
        let neighborNodes = returnNeighbors(id);

        let emptyNodeInx = "";
        let inx = '';
        blocks.forEach((el, i) => {
            if (neighborNodes.includes(el.id) && el.empty) {
                emptyNodeInx = i;
            }
            if (el.id === id) {
                inx = i;
            }
        })
        if (emptyNodeInx !== "") {
            let arr = JSON.parse(JSON.stringify(blocks))
            let temp = JSON.parse(JSON.stringify(arr[inx]));
            arr[inx].label = arr[emptyNodeInx].label;
            arr[inx].empty = arr[emptyNodeInx].empty;
            arr[emptyNodeInx].label = temp.label;
            arr[emptyNodeInx].empty = temp.empty;
            setBlocks(arr);
        }
    }

    return (
        <main className="game-wrapper">
            <div className="game-arena">
                {blocks.map((el) => {
                    return (<div key={Math.random().toString()}
                        onClick={() => changeBlock(el.id)}
                        value={el.id}
                        className={`block ${el.id} ${el.empty}`} >{el.empty || el.label}</div>)
                })}
            </div>
        </main>
    )


}

export default GuideTheBallGame
