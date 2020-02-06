import React, { useEffect, useState } from "react";
import { uniqueIdGenerator } from "../utils/uiGenerator";

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2020-02-14 00:00") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
                min: Math.floor((difference / 1000 / 60) % 60),
                sec: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={uniqueIdGenerator()}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div>
            {timerComponents.length ? <span>Come back after {timerComponents}</span> : ''}
        </div>
    );
}

export default CountdownTimer;