







// navigation menu
const navElem = document.getElementById('navigation');
const toggleElem = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');

const toggleMenu = () => navElem.classList.toggle('open');

toggleElem.onclick = () => navElem.classList.toggle('open');
closeButton.onclick = () => navElem.classList.toggle('open');


// weather forecast
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

const getWeatherForecast = async () => {
   const featured = await getFeaturedTemple();
   const {latitude, longitude} = featured;
   const url =  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=f912de03ce11423891bab669a7ee65a2`
   const response =  await fetch(url)
   const data = await response.json();
   return data;
}

// get featured temple
const renderFeaturedTemple = async () => {
   const featured = await getFeaturedTemple();
   console.log({featured})
   // const display = document.getElementById('featured');

   const h3 = document.createElement('h3');
   const image = document.createElement('img');

   h3.textContent = `${featured.name}`;
   image.setAttribute('src', featured.imageurl);
   image.setAttribute('alt', `logo for ${featured.name}`);
   image.setAttribute('loading', 'lazy');

   document.getElementById('featured').appendChild(h3);
   document.getElementById('featured').appendChild(image);
  



}
const getTemperature = (kelvin) => (((kelvin - 273.15) * 1.8) + 32).toFixed(0);

const getDateElem = (data) => {
   const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
   const desc = data.weather[0].description;
   const weatherIcon = document.createElement('img');
   weatherIcon.setAttribute('src', iconsrc);
   weatherIcon.setAttribute('alt', desc);
   const description = document.createElement('div')
   description.innerHTML = desc;
   
   // container
   const weatherIconDescription = document.createElement('div');
   weatherIconDescription.classList.add('weather-icon-description')
   weatherIconDescription.append(weatherIcon);
   weatherIconDescription.append(description);

   const temperature = document.createElement('div');
   const temp = typeof data.temp === 'number' ? data.temp : data.temp.day
   temperature.innerHTML= getTemperature(temp);

   // container
   const container = document.createElement('div');
   container.append(weatherIconDescription);
   container.append(temperature);
   return container;
}

const renderWeatherForecast = async () => {
   const data = await getWeatherForecast();
   console.log({data})

   // display weather
   const today = document.getElementById('weather');
   const forecast = document.getElementById('weather-forecast');

   today.append(getDateElem(data.current))
   data.daily.slice(0,3).forEach(day => {
      const elem = document.createElement('div')
      elem.classList.add('3-day-weather-item');
      elem.append(getDateElem(day));
      forecast.append(elem)
   })

   // display alert
   const alert = document.createElement('div');
   const closeButton = document.createElement('button');
   const alertMessage = document.createElement('div');

   // TODO - add css for 'weather-alert' (display: flex, etc...)
   alert.classList.add('weather-alert');
   alertMessage.innerHTML = data.current.weather[0]?.description
   closeButton.innerHTML = 'x'
   closeButton.addEventListener('click', () => alert.remove());
   alert.append(alertMessage);
   alert.append(closeButton);
   document.body.prepend(alert);
}



renderFeaturedTemple();
renderWeatherForecast();






