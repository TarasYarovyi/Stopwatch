"use strict";

const stopwatch = document.querySelector(".stopwatch");
const startPauseBtn = document.querySelector(".start");
const splitStopBtn = document.querySelector(".stop");
const timeList = document.querySelector(".time-list");
const resetTimeListBtn = document.querySelector(".resetTimeList");
const showTimeListBtn = document.querySelector(".archive");
const instruction = document.querySelector(".modal-shadow");
const instructionBtn = document.querySelector(".info");
const closeBtn = document.querySelector(".close");

let status = "switchedOff";
let startTime;
let startLapTime;
let currentTime;
let pausedTime;
let demonstratedTime;
let lapNumber = 1;

startPauseBtn.addEventListener("click", startStop);
splitStopBtn.addEventListener("click", splitStop);
showTimeListBtn.addEventListener("click", showTimeList);
resetTimeListBtn.addEventListener("click", resetTimeList);
instructionBtn.addEventListener("click", showInstruction);
closeBtn.addEventListener("click", closeInstruction);

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

function showTimeList() {
  timeList.classList.toggle("hiden");
}

function resetTimeList() {
  startLapTime = startTime;
  lapNumber = 1;
  timeList.replaceChildren();
}

function showInstruction() {
  instruction.style.visibility = "visible";
  instruction.classList.toggle("modal-animation");
}

function closeInstruction() {
  instruction.style.visibility = "hidden";
  instruction.classList.toggle("modal-animation");
}
