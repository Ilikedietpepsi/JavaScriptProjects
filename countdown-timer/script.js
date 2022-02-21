const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function countDown() {
    const currentDate = new Date();
    const newYears = getNewYears(currentDate);
    const newYearsDate = new Date(newYears);

    const secondsLeft = (newYearsDate - currentDate) / 1000 ;

    const days = Math.floor(secondsLeft / 3600 / 24);
    const hours = Math.floor(secondsLeft / 3600) % 24;
    const minutes = Math.floor(secondsLeft / 60) % 60;
    const seconds = Math.floor(secondsLeft) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);
}

function getNewYears(currentDate) {
    const newYears = "1 Jan " + (currentDate.getFullYear() + 1);
    return newYears;
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

countDown();

setInterval(countDown, 1000);