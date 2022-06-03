
let imagesToLoad = document.querySelectorAll('img[data-src]');

const loadImages = (image) => {
   image.setAttribute('src', image.getAttribute('data-src'));


   image.onload = () => {image.removeAttribute('data-src');
   };
};


 if('IntersectionObserver' in window) {
   const observer = new IntersectionObserver((items, observer) => {
     items.forEach((item) => {
       if(item.isIntersecting) {
         loadImages(item.target);
         observer.unobserve(item.target);
       }
     });
   });
   imagesToLoad.forEach((img) => {
     observer.observe(img);
   });
 } else {
   imagesToLoad.forEach((img) => {
     loadImages(img);
   });
 }


const key = 'last-visited'
const getLastVisited = () => {
  const lastVisited = localStorage.getItem(key);
  const today = new Date();
  const todayDateString = today.toLocaleDateString();
  localStorage.setItem(key, todayDateString)
  return lastVisited;
}

const lastVisitedElem = document.querySelector('.last-visited')
const visitElem = document.querySelector('.visit')

const today = new Date()
const lastVisited = getLastVisited();
console.log({lastVisited})
if(!lastVisited) {
  lastVisitedElem.style.display = 'none';
}
else {
  const lastVisitedDate = new Date(lastVisited)
  const difference = today.getTime() - lastVisitedDate.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24)) - 1;
  console.log({days})
  visitElem.innerHTML = days.toString();
}




















