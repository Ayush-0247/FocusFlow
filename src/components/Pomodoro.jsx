import React, { useState, useEffect, useRef } from "react";

export default function Pomodoro() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState("Work"); // Work / Break
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      // switch session
      if (session === "Work") {
        setSession("Break");
        setSecondsLeft(5 * 60);
      } else {
        setSession("Work");
        setSecondsLeft(25 * 60);
      }
      setRunning(false);
      // you could play a small beep here
    }
  }, [secondsLeft, session]);

  const startPause = () => setRunning((r) => !r);
  const reset = () => {
    setRunning(false);
    setSession("Work");
    setSecondsLeft(25 * 60);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="pomodoro">
      <div className="pom-header">{session}</div>
      <div className="pom-timer">
        {mm}:{ss}
      </div>
      <div className="pom-controls">
        <button onClick={startPause}>{running ? "Pause" : "Start"}</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
