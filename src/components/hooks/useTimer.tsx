import { useEffect, useState } from "react";

export function formatTime(seconds: any) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Use template literals to format the time
  const formattedTime = `${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;

  return formattedTime;
}
const useTimer = (timerLimit: number) => {
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [seconds, setSeconds] = useState<number>(timerLimit);

  const startTimer = () => setIsTimerStarted(true);
  const stopTimer = () => setIsTimerStarted(false);
  const resetTimer = () => {
    setSeconds(timerLimit);
    startTimer();
  };

  useEffect(() => {
    if (!isTimerStarted) return;
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          stopTimer();
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerStarted]);

  return { startTimer, stopTimer, seconds, resetTimer };
};

export default useTimer;
