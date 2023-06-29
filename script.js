"use strict";

const stopwatch = document.querySelector(".stopwatch");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");

let status = "switchedOff";
let startTime;
let currentTime;
let pausedTime;
let demonstratedTime;

startBtn.addEventListener("click", switchStopwatch);
stopBtn.addEventListener("click", stop);

function switchStopwatch() {
  if (status === "switchedOn") {
    status = "paused";
    replaceClass(startBtn.firstChild, "fa-pause", "fa-play");
  } else if (status === "switchedOff") {
    status = "switchedOn";
    replaceClass(startBtn.firstChild, "fa-play", "fa-pause");
    startTime = new Date();
    count();
  } else if (status === "paused") {
    status = "switchedOn";
    replaceClass(startBtn.firstChild, "fa-play", "fa-pause");
    startTime = new Date();
    startTime.setTime(startTime.getTime() - pausedTime.getTime());
    count();
  }
}

function stop() {
  status = "switchedOff";
  stopwatch.textContent = "00:00:00";
}

function count() {
  setInterval(() => {
    if (status === "switchedOn") {
      currentTime = new Date();

      demonstratedTime = new Date(currentTime - startTime);
      const min = demonstratedTime.getMinutes().toString().padStart(2, 0);
      const sec = demonstratedTime.getSeconds().toString().padStart(2, 0);
      const ms = Math.trunc(demonstratedTime.getMilliseconds() / 10)
        .toString()
        .padStart(2, 0);
      stopwatch.textContent = `${min}:${sec}:${ms}`;
    } else if (status === "paused") {
      pausedTime = demonstratedTime;
      return;
    }
  });
}

function replaceClass(element, oldClass, newClass) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
  console.log(element);
}
