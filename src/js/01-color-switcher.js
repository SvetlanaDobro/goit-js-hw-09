const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

const timer = {
    intervalId: null,
    isActive:false,
    start() {
        if (this.isActive) {
            return;
        }
        
        this.isActive = true;
        this.intervalId= setInterval(() => {
          
            const newColor = getRandomHexColor();
            document.body.style.backgroundColor = newColor;
            
        }, 1000);
        this.toggleButtons();
    },

    stop () {
        clearInterval(this.intervalId);
        this.isActive = false;

        this.toggleButtons();
    },

    toggleButtons() {
        refs.startBtn.disabled = this.isActive;
        refs.stopBtn.disabled = !this.isActive;
    },
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.startBtn.addEventListener('click', () => {
    timer.start();
    
});
refs.stopBtn.addEventListener('click', () => {
    timer.stop();
});



