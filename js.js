const apiKey = "5dd60cb12931e87d22344f75a802e824";
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const d = new Date();

let apiDataWeather;
let locationLatitude;
let locationLongitude;
let geoSuburb;
let geoCity;
let state;
const weatherHolder = document.getElementById("weather");

function getWeatherHTML(day, i) {
  return `<div class="weather_${i}">
               <p id="weekday">${weekday[d.getDay() + i]}</p>
               <p>I predict there will be ${
                 day.weather[0].main
               }; more specifically ${day.weather[0].description}</p>
              <p>The temperature will be ${day.temp.day}°C</p>
               <p>But will feel like ${day.feels_like.day}°C</p>
               <img id="image" src="/icons/${
                 day.weather[0].icon
               }.svg" alt="weatherIcon" />
              </div>`;
}

async function getWeather() {
  try {
    const weatherApi = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${locationLatitude}&lon=${locationLongitude}&units=metric&exclude=hourly,minutely&appid=${apiKey}`
    );
    state = { days: weatherApi.data.daily };
    for (let i = 1; i < 3; i++) {
      const html = getWeatherHTML(state.days[i], i);
      weatherHolder.insertAdjacentHTML("beforeend", html);
    }
    let currentState = weatherApi.data.current;
    domAddWeather(
      "currentWeather",
      currentState.weather[0].main,
      currentState.weather[0].description
    );
    domAddTemp("currentTemp", "The temperature is ", currentState.temp);
    domAddTemp("currentFeelsLike", "But feels like ", currentState.feels_like);
    domAddImage(currentState.weather[0].icon);
    domAddDays();
  } catch (error) {
    console.log(error);
  }
}

function domAddImage(icon) {
  document.getElementById("image").src = `/icons/${icon}.svg`;
}

function domAddWeather(id, weather, desc) {
  document.getElementById(id).textContent =
    "Currently, we are experiencing " + weather + "; more specifically " + desc;
}

function domAddTemp(id, feel, temperature) {
  document.getElementById(id).textContent = feel + temperature + "°C";
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function success(position) {
  locationLatitude = position.coords.latitude;
  locationLongitude = position.coords.longitude;
  getWeather();
  reverseGeo();
}

function error() {
  console.log("ERROR: Could not retrieve location");
}

function domAddDays() {
  document.getElementById("currentDay").textContent = weekday[d.getDay() + 0];
  // document.getElementById("tomorrowDay").textContent = weekday[d.getDay() + 1];
  // document.getElementById("tomorrow2Day").textContent = weekday[d.getDay() + 2];
}

async function reverseGeo() {
  const geoApi = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${locationLatitude}+${locationLongitude}&key=bcf7e6bbd41d402ea9474185da7f859f`
  );
  geoSuburb = geoApi.data.results[0].components.city_district;
  geoCity = geoApi.data.results[0].components.city;
  domAddSuburb();
}

function domAddSuburb() {
  document.getElementById("suburb").textContent =
    "You are in " + geoSuburb + ", " + geoCity;
}

function forwardGeo() {
  `https://api.opencagedata.com/geocode/v1/json?q=${PLACENAME}&key=bcf7e6bbd41d402ea9474185da7f859f`;
}

getLocation();
