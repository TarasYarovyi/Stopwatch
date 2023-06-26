"use strict";

const stopwatch = document.querySelector(".stopwatch");
const start = document.querySelector(".start");

start.addEventListener("click", count);

function count() {
  const startTime = new Date();
  setInterval(() => {
    const currentTime = new Date();
    const diff = new Date(currentTime - startTime);
    const min = diff.getMinutes().toString().padStart(2, 0);
    const sec = diff.getSeconds().toString().padStart(2, 0);
    const ms = Math.trunc(diff.getMilliseconds() / 10)
      .toString()
      .padStart(2, 0);
    stopwatch.textContent = `${min}:${sec}:${ms}`;
  });
}
