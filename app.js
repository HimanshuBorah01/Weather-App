/// https://www.weatherapi.com/my/

let input = document.querySelector(".input");
let btn = document.querySelector(".search-btn");

const apiKey = '74af14e3d1c7437f8c8164421240312';
const countryCode = 'IN';

let displyCity = document.querySelector("#disply-City");
let displyHumidity = document.querySelector("#disply-Humidity");
let displyWindspeed = document.querySelector("#disply-windspeed");
let displyTemp = document.querySelector("#disply-temp");
let displyIcon = document.querySelector("#disply-weather-icon");
let displyConditionT = document.querySelector("#disply-condition");

btn.addEventListener("click",() => {
  let city = input.value;
  if(!city){
    alert("please enter city name!");
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city},${countryCode}`;

  fetch(url)
  .then(response => {
    if(!response.ok){
      throw new Error ("City not found or API issue");
    }
    return response.json();
  })
    .then(data => {
        let apiData = data;
        // console.log(apiData)
        let cityName = data.location.name;
        displyCity.textContent = cityName

        let humidityData = data.current.humidity;
        displyHumidity.textContent = humidityData + "%";

        let weatherIcon = data.current.condition.icon;
        displyIcon.src = weatherIcon;

        let conditionText = data.current.condition.text;
        displyConditionT.textContent = conditionText;

        let temperature = data.current.temp_c;
        displyTemp.textContent = temperature + "℃"

        let windSpeed = data.current.wind_kph;
        displyWindspeed.textContent = windSpeed +"km/h"
      })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      displyCity.textContent = "City not found";
      displyHumidity.textContent = "0%";
      displyIcon.src = "";
      displyConditionT.textContent = "No Data";
      displyTemp.textContent = "0℃";
      displyWindspeed.textContent = "0km/h";
    });

});  
  