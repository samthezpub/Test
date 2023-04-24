
function SearchCity() {
  
  SendResponse();
}

function main()
{


async function SendResponse() {
  var city = "Mariupol";
  city = document.getElementById("city").value;
  console.log(city);
  let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a9ae892c55bd45c7a17184125232104&q=${city}&days=7&aqi=yes&alerts=yes`, {
    method: 'GET',
    headers: {
      'X-Yandex-API-Key': '0deb4760-2bd7-408a-8c32-b0981901afe7'
    }
  });
  let text = await response.json();
  
  return text;
}



console.log(SendResponse());
var date = new Date();
console.log(date.getHours());
var res;
SendResponse().then((result) => {
  res = result;
  console.log(res);
  document.getElementById("weather_image")["src"] = DeletePrefix(res.forecast.forecastday[0].day.condition.icon);
  document.getElementById("weather-type_now").textContent = res.forecast.forecastday[0].hour[date.getHours()].condition.text;
  document.getElementById("temp_now").textContent = "Текущая температура: " + res.forecast.forecastday[0].hour[date.getHours()].temp_c;
  document.getElementById("date_today").textContent = res.forecast.forecastday[0].date;
  document.getElementById("sunrise_today").textContent = "Восход: " + res.forecast.forecastday[0].astro.sunrise;
  document.getElementById("sunset_today").textContent = "Закат: " + res.forecast.forecastday[0].astro.sunset;
  document.getElementById("max-temp_today").textContent = "Максимальная: " + res.forecast.forecastday[0].day.maxtemp_c + "°";
  document.getElementById("min-temp_today").textContent = "Минимальная: " + res.forecast.forecastday[0].day.mintemp_c + "°";


  function DeletePrefix(str) {
     str = str.substring(2);
    let newstr = "https://" + str;
    return newstr;
  }
  function SendFunction(day) {
    let selectedDay = document.getElementById(day);
    selectedDay.getElementsByClassName("weather-type_text")[0].textContent = res.forecast.forecastday[day].day.condition.text;
    selectedDay.getElementsByClassName("weather-type_img")[0]["src"] = DeletePrefix(res.forecast.forecastday[day].day.condition.icon);
    selectedDay.getElementsByClassName("date")[0].textContent = date.getDate()+day;
    selectedDay.getElementsByClassName("max-temp")[0].textContent = "Максимальная: " + res.forecast.forecastday[day].day.maxtemp_c+ "°";
    selectedDay.getElementsByClassName("min-temp")[0].textContent = "Минимальная: " + res.forecast.forecastday[day].day.mintemp_c+ "°";
    selectedDay.getElementsByClassName("sunrise")[0].textContent = "Восход: " + res.forecast.forecastday[day].astro.sunrise;
    selectedDay.getElementsByClassName("sunset")[0].textContent = "Закат: " + res.forecast.forecastday[day].astro.sunset;
    
  }
  for (let i = 1; i < res.forecast.forecastday.length; i++) {
    
    SendFunction(i);
    
  }
  

})
}

