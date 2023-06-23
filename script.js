"use strict";

const stopwatch = document.querySelector(".stopwatch");
const start = document.querySelector(".pause");

addEventListener("click", count);

function count() {
  const startTime = new Date();
  setInterval(() => {
    const currentTime = new Date();
    const diff = new Date(currentTime - startTime);
    const ms = Math.trunc(diff.getMilliseconds() / 10);
    const sec = diff.getSeconds();
    const min = diff.getMinutes();

    stopwatch.textContent = `${min}:${sec}:${ms}`;
  }, 100);
}
