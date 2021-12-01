const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
const color = {
  TIME: 1000,
  state: false,
  colorChange: null,

  start() {
    if (this.state) {
      return;
    }
    this.state = true;
    this.colorChange = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, this.TIME);
  },

  stop() {
    this.state = false;
    clearInterval(this.colorChange);
  },
};

refs.start.addEventListener('click', () => {
  refs.start.setAttribute('disabled', '');
  color.start();
});
refs.stop.addEventListener('click', () => {
  refs.start.removeAttribute('disabled');
  color.stop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
