

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#last-updated').textContent = document.lastModified;

const datefield = document.querySelector('#day');
const now = new Date();
const fulldate = new Intl.DateTimeFormat('en-us', { dateStyle: 'full'}).format(now);
datefield.innerHTML =`${fulldate}`;


const navElem = document.getElementById('navigation');
const toggleElem = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');


const toggleMenu = () => navElem.classList.toggle('open');

toggleElem.onclick = () => navElem.classList.toggle('open');
closeButton.onclick = () => navElem.classList.toggle('open');

