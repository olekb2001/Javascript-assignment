const monthElement = document.getElementById('month-name');
const dayNameElement = document.getElementById('day-name');
const dayNumElement = document.getElementById('day-number');
const yearElement = document.getElementById('year');
const timeOfDayElement = document.getElementById('time-of-day');
const secondsElement = document.getElementById('seconds-day');

function updateTime(){
const date = new Date();
monthElement.textContent = date.toLocaleString('default', { month: 'long' });
dayNameElement.textContent = date.toLocaleString('default', { weekday: 'long' });
timeOfDayElement.textContent = date.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true });
secondsElement.textContent = date.getSeconds();
dayNumElement.textContent = date.getDate();
yearElement.textContent = date.getFullYear();
}

updateTime();

setInterval(updateTime, 1000);

