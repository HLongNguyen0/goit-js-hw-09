const refs = {
  form: document.querySelector('form'),
  btn: document.querySelector('button'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;
  let position = 0;
  refs.btn.setAttribute('disabled', '');
  setTimeout(event => {
    createPromise()
      .then(() => {
        console.log('good', position);
        position += 1;
      })
      .catch(() => {
        console.log('bad', position);
        position += 1;
      })
      .finally(() => {
        const a = setInterval(() => {
          if (position < amount.value) {
            createPromise()
              .then(() => {
                console.log('good', position);
                position += 1;
              })
              .catch(() => {
                console.log('bad', position);
                position += 1;
              });
          } else {
            refs.form.reset();
            clearInterval(a);
            refs.btn.removeAttribute('disabled');
          }
        }, step.value);
      });
  }, delay.value);
}

function createPromise(position) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    position += 1;
    if (shouldResolve) {
      resolve(position);
    } else {
      reject(position);
    }
  });
}
