let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function updateDisplay() {
    const currentTime = Date.now();
    const diff = currentTime - startTime + elapsedTime;

    const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = 'Stop';
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps = [];
    lapsList.innerHTML = '';
    lapBtn.disabled = true;
});

// Lap button event listener
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = display.textContent;
        laps.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsList.appendChild(lapElement);
    }
});
