


var temperature = document.getElementById('degrees').innerHTML;
var windSpeed = document.getElementById('wind-speed').innerHTML;

// var temperature = 25;
// var windSpeed = 30;

const windChill = (35.74 + (0.6215 * temperature))-(35.75 * Math.pow(windSpeed,0.16))
                + (0.4275*temperature*Math.pow(windSpeed,0.16));




if (temperature <= 50 && windSpeed > 3) {
   document.getElementById("wind-chill").innerText = Math.round(windChill) +'° F';
}
else{
   document.getElementById("wind-chill").innerText = 'N/A';
}





const currentTemp = document.querySelector('#degrees');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#caption');
const windSp = document.querySelector('#wind-speed');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Idaho Falls,US&units=imperial&appid=f912de03ce11423891bab669a7ee65a2';

async function apiFetch() {
   try {
     const response = await fetch(url);
     if (response.ok) {
       const data = await response.json();
       console.log(data); // this is for testing the call
       displayResults(data);
     } else {
         throw Error(await response.text());
     }
   } catch (error) {
       console.log(error);
   }
 }
 
 apiFetch();

 function displayResults(weatherData) {
   currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
   windSp.innerHTML = `<strong>${weatherData.wind.speed.toFixed(0)}</strong>`

   const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
 }





