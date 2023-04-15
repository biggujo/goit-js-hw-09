import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {
  form: document.querySelector(".form"),
  promiseDelayInput: document.querySelector("[name=\"delay\"]"),
  promiseStepInput: document.querySelector("[name=\"step\"]"),
  promiseAmountInput: document.querySelector("[name=\"amount\"]"),
};

refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const promiseDelay = Number(refs.promiseDelayInput.value);
  const promiseStep = Number(refs.promiseStepInput.value);
  const promiseAmount = Number(refs.promiseAmountInput.value);

  for (let curIndex = 0; curIndex < promiseAmount; curIndex++) {
    createPromise(curIndex + 1, promiseDelay + promiseStep * curIndex)
    .then(({
      position,
      delay,
    }) => {
      console.log(123);
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({
      position,
      delay,
    }) => {
      console.log(456);
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
  }
  ;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({
          position,
          delay,
        });
      }
    }, delay);
  });
}
