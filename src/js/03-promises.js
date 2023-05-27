import Notiflix from 'notiflix';

const refs = {
   delay: document.querySelector('input[name="delay"]'),
   step: document.querySelector('input[name="step"]'),
   amount: document.querySelector('input[name="amount"]'),
   button: document.querySelector('button'),
}

refs.button.addEventListener('click', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const firstDelay = parseInt(refs.delay.value);
  const step = parseInt(refs.step.value);
  const amount = parseInt(refs.amount.value);

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const delay = firstDelay + i * step;
  
    createPromise(position, delay)
      .then(({ position, delay }) => {
         Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
