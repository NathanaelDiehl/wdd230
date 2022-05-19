
// footer date and last modified 
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#last-updated').textContent = document.lastModified;
// getting current day

const datefield = document.querySelector('#day');
const now = new Date();
const fulldate = new Intl.DateTimeFormat('en-us', { dateStyle: 'full'}).format(now);
datefield.innerHTML =`${fulldate}`;

// navigation menu
const navElem = document.getElementById('navigation');
const toggleElem = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');

const toggleMenu = () => navElem.classList.toggle('open');

toggleElem.onclick = () => navElem.classList.toggle('open');
closeButton.onclick = () => navElem.classList.toggle('open');

// banner

function generateBanner() {
   const banner = document.createElement('div')
   banner.classList.add('banner')
   banner.innerText = "🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m."
   const header = document.querySelector('header');
   header.prepend(banner);
}

var day = now.getDay();

const weekDays = {
   // key: value
   sunday: 0,
   monday: 1,
   tuesday: 2,
   wednesday: 3,
   thursday: 4,
   friday: 5,
   saturday: 6,
}

// switch(day) {
//    case weekDays.tuesday: 
//    case weekDays.monday:
//    {
//       generateBanner();
//       break;
//    }
// }

if (day == weekDays.monday) {
   generateBanner();
} 
else if (day == weekDays.tuesday) {
   generateBanner();
}

// const bannerDays = [weekDays.monday, weekDays.tuesday]
// if(bannerDays.includes(day)) generateBanner();
 
