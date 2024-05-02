import CountdownTimer from "../CountdownTimer/CountdownTimer";
import InputForm from "../InputForm/InputForm";
import "./HomePage.css";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [countdownData, setCountdownData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    message: "",
  });
  const [intervalId, setIntervalId] = useState(null);

  const startCountDown = (targetDateTime) => {
    clearInterval(intervalId);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDateTime);

      if (target > now) {
        const distance = target - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (days <= 99 && hours <= 23 && minutes <= 59 && seconds <= 59) {
          setIsTimerActive(true);
          setCountdownData({ days, hours, minutes, seconds, message: "" });
        } else {
          setCountdownData({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            message: "Selected time is more than 100 days",
          });
        }
      } else {
        setIsTimerActive(false);
        setCountdownData({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          message:
            "🎉 The countdown is over! What's next on your adventure? 🎉",
        });
        clearInterval(interval);
      }
    }, 1000);
    setIntervalId(interval);
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const handleDateSelect = (date) => {
    startCountDown(date);
  };
  const cancelTimer = () => {
    clearInterval(intervalId);
    setIsTimerActive(false);
    setCountdownData({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      message: "",
    });
  };

  return (
    <div className="home-container">
      <h1 className="heading">
        Countdown <span className="highlight">Timer</span>
      </h1>
      <InputForm isTimerActive={isTimerActive} onDataSelect ={handleDateSelect} onCancel={cancelTimer}/>
      <CountdownTimer countdownData={countdownData}/>
    </div>
  );
};

export default HomePage;
