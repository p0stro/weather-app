function displayTime(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  } else {
    hours = `${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = `${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather-forecast-date"><h5>${formatDay(
                  forecastDay.dt
                )}</h5></div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }.png"
                  alt=""
                  width="50"
                  class="forecast-icon"
                />
                <h6>
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max"> ${Math.round(
                      forecastDay.temp.max
                    )}°  </span>
                    <span class="weather-forecast-temperature-min"> ${Math.round(
                      forecastDay.temp.min
                    )}° </span>
                  </div>
                </h6>
              </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a5aa2153515afe1c284d0dd78ad6653e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(coordinates);
}
let time = document.querySelector("#time");
time.innerHTML = displayTime(new Date());

function responseData(response) {
  let cityName = response.data.name;
  document.querySelector("h1").innerHTML = cityName;
  let roundedCelsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = roundedCelsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

let celsiusTemperature = null;

function getWeatherByName(event) {
  event.preventDefault();
  let cityToSearch = document.querySelector("#city-input").value;
  let apiKey = "a5aa2153515afe1c284d0dd78ad6653e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(responseData);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  if (celsiusTemperature != null) {
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  if (celsiusTemperature != null) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
}

let form = document.querySelector("#search-location");
form.addEventListener("submit", getWeatherByName);

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherByCoords);
}

function getWeatherByCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a5aa2153515afe1c284d0dd78ad6653e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(responseData);
}
let locationButton = document.querySelector("#current");
locationButton.addEventListener("click", getPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
