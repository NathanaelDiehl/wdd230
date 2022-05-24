


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











