import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const INTERVAL_DELAY = 1000;

const refs = {
  dateTimePicker: document.getElementById("datetime-picker"),
  startButton: document.querySelector("[data-start]"),
  timerDays: document.querySelector("[data-days]"),
  timerHours: document.querySelector("[data-hours]"),
  timerMinutes: document.querySelector("[data-minutes]"),
  timerSeconds: document.querySelector("[data-seconds]"),
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDatePickerClose(selectedDates);
  },
};

let canTimerBeStarted = false; // In case of "disabled" removed from HTML
let savedSelectedDate = null;
let timerId = null;

refs.startButton.addEventListener("click", onButtonStartClick);

disableStartTimerPossibility();
flatpickr(refs.dateTimePicker, flatpickrOptions);

function onButtonStartClick() {
  if (!canTimerBeStarted) {
    return;
  }

  renderDate();
  timerId = setInterval(renderDate, INTERVAL_DELAY);
}

function onDatePickerClose([selectedDate]) {
  if (!isDateInTheFuture(selectedDate)) {
    Notify.failure("Please choose a date in the future");
    disableStartTimerPossibility();
    return;
  }

  enableStartTimerPossibility();
  savedSelectedDate = selectedDate;
}

function renderDate() {
  if (!isDateInTheFuture(savedSelectedDate)) {
    return;
  }

  const diff = savedSelectedDate - Date.now();

  const {
    days,
    hours,
    minutes,
    seconds,
  } = convertMs(diff);

  refs.timerDays.textContent = addLeadingZero(days);
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMinutes.textContent = addLeadingZero(minutes);
  refs.timerSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function addLeadingZero(number) {
  return String(number).padStart(2, "0");
}

function enableStartTimerPossibility() {
  canTimerBeStarted = true;
  refs.startButton.disabled = false;
}

function disableStartTimerPossibility() {
  canTimerBeStarted = false;
  refs.startButton.disabled = true;
}

function isDateInTheFuture(date) {
  return date - Date.now() > 0;
}