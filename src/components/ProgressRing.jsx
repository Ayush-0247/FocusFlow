import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressRing({ percentage = 0 }) {
  return (
    <div style={{ width: 86, margin: "0 auto" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: "28px",
          pathTransitionDuration: 0.5,
          pathColor: `#4f46e5`,
          textColor: "#111827",
          trailColor: "#e6e6e6",
        })}
      />
      <div style={{ textAlign: "center", fontSize: 12, marginTop: 8 }}>Completed</div>
    </div>
  );
}
