"use strict";

const stopwatch = document.querySelector(".stopwatch");
const start = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
let status = "switchedOff";
let startTime;
let currentTime;
let pausedTime;
let diff;
let min = 0;
let sec = 0;
let ms = 0;

start.addEventListener("click", on);
pauseBtn.addEventListener("click", pause);

function on() {
  if (status === "switchedOn") {
    return;
  } else if (status === "switchedOff") {
    status = "switchedOn";
    startTime = new Date();
    count();
  } else if (status === "paused") {
    status = "switchedOn";
    startTime = new Date();
    startTime.setTime(startTime.getTime() - pausedTime.getTime());
    count();
  }
}

function pause() {
  status = "paused";
}

function count() {
  setInterval(() => {
    if (status === "switchedOn") {
      currentTime = new Date();

      diff = new Date(currentTime - startTime);
      min = diff.getMinutes().toString().padStart(2, 0);
      sec = diff.getSeconds().toString().padStart(2, 0);
      ms = Math.trunc(diff.getMilliseconds() / 10)
        .toString()
        .padStart(2, 0);
      stopwatch.textContent = `${min}:${sec}:${ms}`;
    } else if (status === "paused") {
      pausedTime = diff;
      return;
    }
  });
}
