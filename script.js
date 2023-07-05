"use strict";

const stopwatch = document.querySelector(".stopwatch");
const startPauseBtn = document.querySelector(".start");
const splitStopBtn = document.querySelector(".stop");
const resetTimeListBtn = document.querySelector(".reset");
const showTimeListBtn = document.querySelector(".archive");
const timeList = document.querySelector(".time-list");

let status = "switchedOff";
let startTime;
let startLapTime;
let currentTime;
let pausedTime;
let demonstratedTime;
let lapNumber = 1;

startPauseBtn.addEventListener("click", startStop);
splitStopBtn.addEventListener("click", splitStop);
resetTimeListBtn.addEventListener("click", resetTimeList);
showTimeListBtn.addEventListener("click", showTimeList);

function showTimeList() {
  timeList.classList.toggle("hiden");
}

function startStop() {
  if (status === "switchedOn") {
    replaceClass(startPauseBtn.firstChild, "fa-pause", "fa-play");
    replaceClass(splitStopBtn.firstChild, "fa-arrows-spin", "fa-stop");
    status = "paused";

    startLapTime = new Date();
  } else if (status === "switchedOff") {
    status = "switchedOn";
    replaceClass(startPauseBtn.firstChild, "fa-play", "fa-pause");
    replaceClass(splitStopBtn.firstChild, "fa-stop", "fa-arrows-spin");
    startTime = new Date();
    startLapTime = startTime;
    count();
  } else if (status === "paused") {
    status = "switchedOn";
    replaceClass(startPauseBtn.firstChild, "fa-play", "fa-pause");
    replaceClass(splitStopBtn.firstChild, "fa-stop", "fa-arrows-spin");
    startTime = new Date();
    startLapTime = startTime;
    startTime.setTime(startTime.getTime() - pausedTime.getTime());
    count();
  }
}

function replaceClass(element, oldClass, newClass) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
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

function splitStop() {
  if (status === "switchedOn") {
    timeList.classList.remove("hiden");
    const lap = new Date(currentTime - startLapTime);
    let li = document.createElement("li");

    showTime(li, `lap ${lapNumber} - `, lap);
    lapNumber++;
    timeList.prepend(li);
    startLapTime = new Date();
  } else if (status === "paused") {
    status = "switchedOff";
    replaceClass(startPauseBtn.firstChild, "fa-arrows-spin", "fa-play");
    stopwatch.textContent = "00:00,00";
    lapNumber = 1;
    timeList.replaceChildren();
  }
}

function resetTimeList() {
  startLapTime = startTime;
  lapNumber = 1;
  timeList.replaceChildren();
}
