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

  let day = days[now.getDay()];

  return `${day}, ${hours}:${minutes}`;
}
let time = document.querySelector("#time");
time.innerHTML = displayTime(new Date());

function responseData(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}`;
  let temperatureSpan = document.querySelector("#temperature");
  temperatureSpan.innerHTML = `${temperature}`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function getWeatherByName(event) {
  event.preventDefault();
  let cityToSearch = document.querySelector("#city-input").value;
  let apiKey = "a5aa2153515afe1c284d0dd78ad6653e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(responseData);
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
