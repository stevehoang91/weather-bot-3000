import { apiKey, weekday, geoApiKey } from "./config.js";
import {
  getWeatherHTML,
  domAddImage,
  domAddWeather,
  domAddTemp,
} from "./functions.js";

const d = new Date();

let locationLatitude;
let locationLongitude;
let geoSuburb;
let geoCity;
let state;
const weatherHolder = document.getElementById("weather");
const searchLocationRef = document.getElementById("searchId");
const submit = document.getElementById("buttonId");

submit.addEventListener("click", () => {
  forwardGeo();
});

async function getWeather() {
  try {
    const weatherApi = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${locationLatitude}&lon=${locationLongitude}&units=metric&exclude=hourly,minutely&appid=${apiKey}`
    );
    state = { days: weatherApi.data.daily };
    weatherHolder.innerHTML = "";
    for (let i = 1; i < 3; i++) {
      const html = getWeatherHTML(state.days[i], i, d, weekday);
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

async function forwardGeo() {
  console.log(searchLocationRef.value);
  const locationClick = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${searchLocationRef.value}&key=${geoApiKey}`
  );
  let locationState = locationClick.data.results[0].geometry;
  console.log(locationState);
  console.log(locationState.lat, locationState.lng);
  locationLatitude = locationState.lat;
  locationLongitude = locationState.lng;
  getWeather();
  reverseGeo();
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
}
//Add try catch on reverse GEO in case of no location
async function reverseGeo() {
  try {
    const geoApi = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${locationLatitude}+${locationLongitude}&key=${geoApiKey}`
    );
    geoSuburb = geoApi.data.results[0].components.city_district
      ? geoApi.data.results[0].components.city_district + ", "
      : " ";
    geoCity = geoApi.data.results[0].components.city;
    domAddSuburb();
  } catch (error) {
    console.log(error);
  }
}

function domAddSuburb() {
  document.getElementById("suburb").textContent =
    "You are in " + geoSuburb + geoCity;
}

getLocation();
