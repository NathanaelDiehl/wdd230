







// navigation menu --------------------------------
const navElem = document.getElementById('navigation');
const toggleElem = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');

const toggleMenu = () => navElem.classList.toggle('open');

toggleElem.onclick = () => navElem.classList.toggle('open');
closeButton.onclick = () => navElem.classList.toggle('open');


// weather forecast  ---------------------------------
const getTempleData = async () => {
   const response = await fetch('json/data.json');
   const data = await response.json();
   return data.temples;
}

let featuredIndex;
const getFeaturedTemple = async () => {
   const temples = await getTempleData();
   if(!featuredIndex) featuredIndex = Math.floor(Math.random() * temples.length);
   return temples[featuredIndex]
}

const getWeatherForecast = async (latitude, longitude) => {
   const url =  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=ac65c8f913bf91d2407f54d4f7913601`
   const response =  await fetch(url)
   const data = await response.json();
   console.log(data)
   return data;
}

// get featured temple ---------------------------------
const renderFeaturedTemple = async () => {
   const featured = await getFeaturedTemple();
   // const display = document.getElementById('featured');

   const h3 = document.createElement('h3');
   const image = document.createElement('img');
   const p = document.createElement('p');

   h3.textContent = `${featured.name}`;
   image.setAttribute('src', featured.imageurl);
   image.setAttribute('alt', `logo for ${featured.name}`);
   image.setAttribute('loading', 'lazy');
   p.textContent = `${featured.facts}`;

   document.getElementById('featured').appendChild(h3);
   document.getElementById('featured').appendChild(image);
   document.getElementById('featured').appendChild(p);
  

}

const getTemperature = (kelvin) => (((kelvin - 273.15) * 1.8) + 32).toFixed(0);

const getWeatherElem = (data) => {
   const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
   const desc = data.weather[0].description;
   const weatherIcon = document.createElement('img');
   weatherIcon.setAttribute('src', iconsrc);
   weatherIcon.setAttribute('alt', desc);
   const description = document.createElement('div')
   description.innerHTML = desc;
   
   // container --------------------------------------------
   const weatherIconDescription = document.createElement('div');
   weatherIconDescription.classList.add('weather-icon-description')
   weatherIconDescription.append(weatherIcon);
   weatherIconDescription.append(description);

   const temperature = document.createElement('div');
   const temp = typeof data.temp === 'number' ? data.temp : data.temp.day
   temperature.innerHTML= `${getTemperature(temp)}&#x2109;`;

   // container ----------------------------------------------
   const container = document.createElement('div');
   container.append(weatherIconDescription);
   container.append(temperature);
   return container;
}

const renderWeatherForecast = async () => {
   const featured = await getFeaturedTemple();
   const {latitude, longitude} = featured;
   const data = await getWeatherForecast(latitude, longitude);

   // display weather ---------------------------------------
   const today = document.getElementById('weather');
   const forecast = document.getElementById('weather-forecast');

   today.append(getWeatherElem(data.current))
   data.daily.slice(0,3).forEach(day => {
      const elem = document.createElement('div')
      elem.classList.add('3-day-weather-item');
      elem.append(getWeatherElem(day));
      forecast.append(elem)
   })

   // display alert
   const alert = document.createElement('div');
   const closeButton = document.createElement('button');
   const alertMessage = document.createElement('div');


   function isThereAlerts(str){
      
   }



   // TODO - add css for 'weather-alert' (display: flex, etc...)
   // if (typeof data.alerts !== 'undefined' || data.alerts !== null) {
      alert.classList.add('weather-alert');
      // alertMessage.innerHTML = data.alerts.description;
      closeButton.innerHTML = 'x';
      closeButton.addEventListener('click', () => alert.remove());
      alert.append(alertMessage);
      alert.append(closeButton);
      document.body.prepend(alert);
   // }
  
}




// -------------- TEMPLES --------------------

const renderTemples = async () => {
   const temples = await getTempleData();
   const templeslist = document.querySelector('.temples-list');
   temples.forEach(temple => templeslist.append(renderTemple(temple)))
}

// creates Cards for each Temple 
const renderTemple = ({
   id,
   name, 
   address, 
   phonenumber, 
   email, 
   services, 
   imageurl, 
   ordinances, 
   sessions, 
   closures, 
   history,
   latitude,
   longitude,
   facts
}) => {
   const templeCard = document.createElement('div');
   templeCard.classList.add('temple-card');
   templeCard.innerHTML = `
      <div class="card-header">
         <h1>${name}</h1>
      </div>
      <img src="${imageurl}" alt="${name}" />
      <ul>
         <li>Address: ${address}</li>
         <li>Phone: ${phonenumber}</li>
      </ul>
   `;


   const showMore = `Show More <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <polyline points="6 9 12 15 18 9"></polyline>
   </svg>`

   const showLess = `Show Less <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <polyline points="6 15 12 9 18 15"></polyline>
   </svg>`

   const detailsToggle = document.createElement('a');
   detailsToggle.classList.add('toggle-details');
   detailsToggle.innerHTML = showMore

   const details = document.createElement('div');
   details.classList.add('details');
   details.style.display = 'none';
   details.innerHTML = `
      <div class="weather temple-weather">
      <h3>Todays Weather</h3>
         <div class="today-weather temple-today-weather" id="weather">
         </div>
      </div>
      <div class="services">
         <h4>Services</h4>
         ${renderList(services)}
      </div>
      <div class="ordinances">
         <h4>Ordinance</h4>
         ${renderList(ordinances)}
         <h4>Session</h4>
         ${renderList(sessions)}
      </div>
      <div class="closures">
         <h4>Closure</h4>
         ${renderClosures(closures)}
      </div>
      <div class="history">
         <h4>Temple History</h4>
         ${renderList(history)}
      </div>
      <div class="temple-details">
         <h4>Temple Fun Facts</h4>
         ${facts}
      </div>
   `
   
   templeCard.append(detailsToggle);
   templeCard.append(details)

   

   detailsToggle.onclick = function(e) {
      this.classList.toggle('active');
      const isActive = this.classList.contains('active');
      this.innerHTML = isActive ? showLess : showMore;
      details.style.display = isActive ? 'block' : 'none';
   }

   templeCard.querySelector('.card-header').append(renderLikeButton(id))
   renderWeather(latitude, longitude).then(elem => templeCard.querySelector('.today-weather').append(elem))

   return templeCard;
}

// rendering list from JSON file 
const renderList = (list) => `
   <ul>
      ${list.map(item => `<li>${item}</li>`).join('')}
   </ul>
`


// Rendering child values from list in JSON file 
const renderClosures = (closures) => Object.entries(closures).map(([key, value]) => `
   <div>
      <strong>${key}</strong>
      <ul>
         ${value.map(x => `<li>${x}</li>`).join('')}
      </ul>
   </div>
`).join('')

const renderWeather = async (latitude, longitude) => {
   const {current} = await getWeatherForecast(latitude, longitude);
   const container = document.createElement('div');
   container.classList.add('temple-card-weather');
   const iconsrc = `https://openweathermap.org/img/w/${current.weather[0].icon}.png`;
   const desc = current.weather[0].description;
   container.innerHTML = `
      <img src="${iconsrc}" alt="${desc}" />
      <div>
         <span>${desc}</span>
         <span>${getTemperature(current.temp)}&#x2109;</span>
      </div>
   `
   return container;
}


// getting local storage arrays or create one if none
const getLiked = () => {
   const liked = JSON.parse(localStorage.getItem('liked')) ?? [];
   return Array.isArray(liked) ? liked : []
}

// checks and adds or deletes id from liked array
const toggleLiked = (id) => {
   let liked = getLiked();
   
   if(!liked.includes(id)) liked.push(id);
   else liked = liked.filter(likedId => likedId !== id);
   localStorage.setItem('liked', JSON.stringify(liked));
}

// changes colors for when clicked 
const getLikeButtonColors = (id) => {
   const liked = getLiked();
   const isLiked = liked.includes(id);
   const colors = isLiked ? {
      stroke: 'red',
      fill: 'red'
   } : {
      stroke: 'black',
      fill: 'none'
   }
   return colors;
}

// created button for like 
const renderLikeButton = (id) => {
   const colors = getLikeButtonColors(id);
   const button = document.createElement('button');
   button.classList.add('like-button');
   button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="${colors.stroke}" fill="${colors.fill}" stroke-linecap="round" stroke-linejoin="round">
         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
         <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      </svg>
   `
   button.onclick = function(e) {
      toggleLiked(id);
      const colors = getLikeButtonColors(id)
      const svg = button.querySelector('svg');
      svg.style.fill = colors.fill;
      svg.style.stroke = colors.stroke;
   }

   return button;
}

