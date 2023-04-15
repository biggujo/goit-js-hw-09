import { Notify } from "notiflix/build/notiflix-notify-aio";

const INTERVAL_DELAY = 1000;

const refs = {
  body: document.body, // For the better performance
  buttonStart: document.querySelector("[data-start]"),
  buttonStop: document.querySelector("[data-stop]"),
};

let timerId = null;
let isActive = false;

refs.buttonStart.addEventListener("click", onButtonStartClick);
refs.buttonStop.addEventListener("click", onButtonStopClick);

function onButtonStartClick() {
  if (isActive) {
    return;
  }

  isActive = true;

  toggleAvailabilityOfAllButtons();
  announceStart();
  startSetRandomBodyBackgroundColor();
}

function onButtonStopClick() {
  if (!isActive) {
    return;
  }

  isActive = false;

  toggleAvailabilityOfAllButtons();
  announceStop();
  stopSetRandomBodyBackgroundColor();
}

function startSetRandomBodyBackgroundColor() {
  setBodyBackgroundColor(getRandomHexColor());
  timerId = setInterval(() => {
    setBodyBackgroundColor(getRandomHexColor());
  }, INTERVAL_DELAY);
}

function stopSetRandomBodyBackgroundColor() {
  clearInterval(timerId);
}

function toggleAvailabilityOfAllButtons() {
  refs.buttonStart.disabled = !refs.buttonStart.disabled;
  refs.buttonStop.disabled = !refs.buttonStop.disabled;
}

function setBodyBackgroundColor(color) {
  refs.body.style.backgroundColor = color;
}

function announceStart() {
  Notify.info("Start generating random backgrounds!");
}

function announceStop() {
  Notify.info("Stop generating random backgrounds!");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6,
    0,
  )}`;
}