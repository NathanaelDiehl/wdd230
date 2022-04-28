let currentDay = new Date(document.lastModified).toLocaleDateString()

let currentMoment = new Date(document.lastModified).toLocaleTimeString()

document.getElementById('current-date').innerHTML = currentDay;
document.getElementById('current-time').innerHTML = currentMoment;
document.getElementById("year").innerHTML = new Date().getFullYear();


