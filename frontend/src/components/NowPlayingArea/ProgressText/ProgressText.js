import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

function ProgressText({ total, isActive, isReset }) {
  const [seconds, setSeconds] = useState(0);

  function formatSeconds(seconds) {
    let hour = Math.round(minutes / 60);
    let minutes = Math.round(seconds / 60);
    let remainingSeconds = seconds % 60;

     if (hour === 0) {
      hour = "00";
    } else if (hour < 10) {
      hour = "0" + hour;
    }

    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (remainingSeconds === 0) {
      remainingSeconds = "00";
    } else if (remainingSeconds < 10) {
      remainingSeconds = "0" + remainingSeconds;
    }

    return `${minutes}:${remainingSeconds}`;
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (isReset) {
      setSeconds(0);
    }
  }, [isReset]);

  return (
    <Typography align="center" color="secondary">
      {formatSeconds(seconds)}/{total}
    </Typography>
  );
}

export default ProgressText;
