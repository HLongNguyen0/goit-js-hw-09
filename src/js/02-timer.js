import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  date: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button'),
  span: [...document.querySelectorAll('.value')],
};
let interval = null;
let pickedTime = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedTime = selectedDates[0].getTime();
    if (dateCheck(pickedTime)) {
      refs.btn.removeAttribute('disabled');
    } else {
      refs.btn.setAttribute('disabled', '');
    }
    clearInterval(interval);
    refs.span[0].textContent = '00';
    refs.span[1].textContent = '00';
    refs.span[2].textContent = '00';
    refs.span[3].textContent = '00';
  },
};

flatpickr(refs.date, options);

refs.btn.addEventListener('click', () => {
  interval = setInterval(() => {
    let remainTime = pickedTime - Date.now();
    const counter = convertMs(remainTime);
    if (remainTime > 0) {
      refs.span[0].textContent = counter.days;
      refs.span[1].textContent = counter.hours;
      refs.span[2].textContent = counter.minutes;
      refs.span[3].textContent = counter.seconds;
    }
  }, 1000);
});

function dateCheck(time) {
  if (Date.now() < time) {
    return true;
  }
  return false;
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

  return { days, hours, minutes, seconds };
}
