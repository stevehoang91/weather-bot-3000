import { apiKey, weekday, geoApiKey } from "./config.js";
import {
  getWeatherHTML,
  domAddImage,
  domAddWeather,
  domAddTemp,
  domAddDays,
  domCurrentWeather,
  domAddLocationDetails,
} from "./functions.js";
const d = new Date();
let locationLatitude;
let locationLongitude;
let geoDistrict;
let geoCity;
let geoCountry;
let state;
const weatherHolder = document.getElementById("weather");
const searchLocationRef = document.getElementById("searchId");
const submit = document.getElementById("buttonId");
//Listens for submit click and runs forward location function
submit.addEventListener("click", () => {
  forwardGeo();
});
//Grabs data from weather API, inserts information to the DOM
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
    domCurrentWeather(weekday, d, currentState);
  } catch (error) {
    console.log(error);
  }
}
//Finds lat and long from user submission, returns getWeather function with new desired location
async function forwardGeo() {
  console.log(searchLocationRef.value);
  const locationClick = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${searchLocationRef.value}&key=${geoApiKey}`
  );
  let locationState = locationClick.data.results[0].geometry;
  locationLatitude = locationState.lat;
  locationLongitude = locationState.lng;
  getWeather();
  reverseGeo();
}
//Getting user location from navigator
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
async function reverseGeo() {
  try {
    const geoApi = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${locationLatitude}+${locationLongitude}&key=${geoApiKey}`
    );
    geoDistrict = geoApi.data.results[0].components.city_district
      ? geoApi.data.results[0].components.city_district + ", "
      : " ";
    geoCity = geoApi.data.results[0].components.city
      ? geoApi.data.results[0].components.city + ", "
      : " ";
    geoCountry = geoApi.data.results[0].components.country
      ? geoApi.data.results[0].components.country
      : "I cannot find this location";
    domAddLocationDetails(geoDistrict, geoCity, geoCountry);
  } catch (error) {
    console.log(error);
  }
}
getLocation();
