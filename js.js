import { apiKey, weekday, geoApiKey } from "./config.js";
import {
  getWeatherHTML,
  domAddImage,
  domAddWeather,
  domAddTemp,
  domAddDays,
  domCurrentWeather,
  domAddLocationDetails,
  errorLocation,
  errorSearchInput,
  errorApiOffline,
  errorNotLetters,
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
    if (error.response) {
      alert(
        "Sorry, we have encountered an error: " + error.response.data.message
      );
    } else {
      errorApiOffline(weatherHolder);
    }
  }
}
//Finds lat and long from user submission, returns getWeather function with new desired location
async function forwardGeo() {
  const regexCheck = /[A-Za-zÀ-ÖØ-öø-ÿ]/gm;
  if (regexCheck.test(searchLocationRef.value)) {
    try {
      const locationClick = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${searchLocationRef.value}&key=${geoApiKey}`
      );
      let locationState = locationClick.data.results[0].geometry;
      locationLatitude = locationState.lat;
      locationLongitude = locationState.lng;
      getWeather();
      reverseGeo();
    } catch (error) {
      errorSearchInput(weatherHolder);
    }
  } else {
    errorNotLetters(weatherHolder);
  }
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
  errorLocation();
}
async function reverseGeo() {
  try {
    const geoApi = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${locationLatitude}+${locationLongitude}&key=${geoApiKey}`
    );
    const { city_district, city, country } = geoApi.data.results[0].components;
    geoDistrict = city_district ? city_district + ", " : " ";
    geoCity = city ? city + ", " : " ";
    geoCountry = country ? country : "I cannot find this location";
    domAddLocationDetails(geoDistrict, geoCity, geoCountry);
  } catch (error) {
    console.log(error);
  }
}

getLocation();
