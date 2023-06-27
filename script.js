"use strict";

const stopwatch = document.querySelector(".stopwatch");
const start = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
let status;
let startTime;
let currentTime;
let diff;
let min;
let sec;
let ms;

start.addEventListener("click", on);
pauseBtn.addEventListener("click", pause);

function on() {
  startTime = new Date();
  status = "switchedOff";

  setInterval(() => {
    if (status === "switchedOff") {
      currentTime = new Date();

      diff = new Date(currentTime - startTime);
      min = diff.getMinutes().toString().padStart(2, 0);
      sec = diff.getSeconds().toString().padStart(2, 0);
      ms = Math.trunc(diff.getMilliseconds() / 10)
        .toString()
        .padStart(2, 0);
      stopwatch.textContent = `${min}:${sec}:${ms}`;
    } else if (status === "paused") {
      startTime = currentTime;
      stopwatch.textContent = `${min}:${sec}:${ms}`;
    }
  });
}

function pause() {
  status = "paused";
}
