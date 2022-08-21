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
