import { useState, useEffect } from "react";
import "../CSS/Home.css";


const Countdown = ({ eventName, eventDate }) => {
    const calculateTimeLeft = () => {
        const eventTime = new Date(eventDate).getTime();
        const currentTime = Date.now();

        return eventTime - currentTime;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() =>{
            const countdown = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            })
            return () => clearInterval(countdown);
    },[eventDate]);

    const formatTime = (msTime) => {
        const totalSeconds = Math.floor(msTime / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % (3600)) / 60);
        const seconds = Math.floor(totalSeconds % 60)

        return `${days}d ${hours}h ${minutes}m ${seconds}s`
    }
  return (
    <div className = "mainPage-body">
      <h1 className="summaryTitle">Countdown to {eventName}</h1>
      <p className = "summary">
        {timeLeft > 0 ? `Time left: ${formatTime(timeLeft)}` : "Time's up!"}
      </p>
    </div>
  );
};

export default Countdown;
