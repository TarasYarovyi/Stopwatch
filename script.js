"use strict";

const stopwatch = document.querySelector(".stopwatch");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const pauseBtn = document.querySelector(".pause");
const timeList = document.querySelector(".time-list");

let status = "switchedOff";
let startTime;
let startLap;
let currentTime;
let pausedTime;
let demonstratedTime;
let displayTime;
let lapNumber = 1;

startBtn.addEventListener("click", switchStopwatch);
pauseBtn.addEventListener("click", pause);
stopBtn.addEventListener("click", stop);

function switchStopwatch() {
  if (status === "switchedOn") {
    replaceClass(startBtn.firstChild, "fa-play", "fa-arrows-spin");
    const lap = new Date(currentTime - startLap);
    let li = document.createElement("li");

    showTime(li, `lap ${lapNumber} - `, lap);
    lapNumber++;
    timeList.prepend(li);
    startLap = new Date();
  } else if (status === "switchedOff") {
    status = "switchedOn";
    replaceClass(startBtn.firstChild, "fa-play", "fa-arrows-spin");
    startTime = new Date();
    startLap = startTime;
    count();
  } else if (status === "paused") {
    status = "switchedOn";
    replaceClass(startBtn.firstChild, "fa-play", "fa-arrows-spin");
    startTime = new Date();
    startTime.setTime(startTime.getTime() - pausedTime.getTime());
    count();
  }
}

function stop() {
  status = "switchedOff";
  replaceClass(startBtn.firstChild, "fa-arrows-spin", "fa-play");
  stopwatch.textContent = "00:00,00";
  lapNumber = 1;
  timeList.replaceChildren();
}
function pause() {
  status = "paused";
  replaceClass(startBtn.firstChild, "fa-arrows-spin", "fa-play");
}

function count() {
  setInterval(() => {
    if (status === "switchedOn") {
      currentTime = new Date();
      demonstratedTime = new Date(currentTime - startTime);
      showTime(stopwatch, "", demonstratedTime);
    } else if (status === "paused") {
      pausedTime = demonstratedTime;
      return;
    }
  });
}
function showTime(element, description, date) {
  const min = date.getMinutes().toString().padStart(2, 0);
  const sec = date.getSeconds().toString().padStart(2, 0);
  const ms = Math.trunc(date.getMilliseconds() / 10)
    .toString()
    .padStart(2, 0);
  element.textContent = `${description}${min}:${sec},${ms}`;
}

function replaceClass(element, oldClass, newClass) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}
