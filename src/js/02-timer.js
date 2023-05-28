import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector("#datetime-picker");

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]')
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([{selectedDate}]) {
    
    if (selectedDate < Date.now()) {
      window.alert("Please choose a date in the future");
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
       }
  },
};

flatpickr(input, options);

class Timer {
  constructor({ targetDate, onTick }) {
    this.targetDate = targetDate;
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  start() {
    if (this.isActive) {
      return;
    }

    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = this.targetDate - currentTime;
      const {days, hours, minutes, seconds} = this.convertMs(deltaTime);

      this.onTick({ days, hours, minutes, seconds });

      if (deltaTime <= 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = this.pad(Math.floor(ms / day));
  const hours = this.pad(Math.floor((ms % day) / hour));
  const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
   const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

 pad(value) {
  return String(value).padStart(2, '0');
}
}


const startTime = () => {
  const selectedDate = input.value;
  const targetDate = new Date(selectedDate).getTime();

  const timer = new Timer({
  targetDate,
  onTick: upDateClockFace,
  });
  
  timer.start();
}



refs.startBtn.addEventListener('click', startTime);

function upDateClockFace({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = days >= 0 ?`${days}`:'00';
  refs.dataHours.textContent = hours >= 0 ? `${hours}` : '00';
  refs.dataMinutes.textContent = minutes >= 0 ? `${minutes}` : '00';
  refs.dataSeconds.textContent = seconds >= 0 ? `${seconds}` : '00';
}







