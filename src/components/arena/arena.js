import React, { useState, useEffect } from 'react';
import { uniqueIdGenerator } from '../../utils/uiGenerator'
import Header from '../header'

import './arena.scss';

const Arena = () => {
    const [className, setClassName] = useState([]);
    const [timer, setTimer] = useState(10 + ":" + 1);
    const [cardNumb, setCardNumb] = useState(0);
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
        // console.log('el.cardUniqueId', el.cardUniqueId, selectedCards);

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
                setTurnedCards(oldTurnedCards => [...oldTurnedCards, el.cardUniqueId])
            }
        }
    }

    // const countDown = () => {
    //     let time = 10 + ":" + 1;
    //     startTimer();

    //     function startTimer() {
    //         let presentTime = time;
    //         let timeArray = presentTime.split(/[:]+/);
    //         let m = timeArray[0];
    //         let s = checkSecond((timeArray[1] - 1));
    //         if (s == 59) { m = m - 1 }
    //         //if(m<0){alert('timer completed')}
    //         time = m + ":" + s;
    //         console.log(m + ":" + s)
    //         setTimeout(startTimer, 1000);
    //     }

    //     function checkSecond(sec) {
    //         if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    //         if (sec < 0) { sec = "59" };
    //         return sec;
    //     }
    // }

    // countDown();

    return (
        <>
            <Header />
            
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
