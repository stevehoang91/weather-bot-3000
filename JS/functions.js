//function running of a loop to create HTML
export let getWeatherHTML = (day, i, d, weekday) => {
  return `<div class="weather_${i}">
  <p id="weekday">${weekday[d.getDay() + i]}</p>
  <p>I predict the weather will be ${day.weather[0].main}; more specifically ${
    day.weather[0].description
  }</p>
 <p>The temperature will be ${day.temp.day}°C</p>
  <p>But will feel like ${day.feels_like.day}°C</p>
  <img id="image" src="/icons/${day.weather[0].icon}.svg" alt="weatherIcon" />
 </div>`;
};

//function to add applicable icon
let domAddImage = (icon) => {
  document.getElementById("image").src = `/icons/${icon}.svg`;
};

//function to add details to the DOM
let domAddWeather = (id, weather, desc) => {
  document.getElementById(id).textContent =
    "Currently, we are experiencing " + weather + "; more specifically " + desc;
};

// function to add temperature to the DOM
let domAddTemp = (id, feel, temperature) => {
  document.getElementById(id).textContent = feel + temperature + "°C";
};

// function to add day of the week to the DOM
let domAddDays = (weekday, d) => {
  document.getElementById("currentDay").textContent = weekday[d.getDay() + 0];
};

// function to add current weather to the DOM
export let domCurrentWeather = (weekday, d, currentState) => {
  const { temp, feels_like, weather } = currentState;
  domAddWeather("currentWeather", weather[0].main, weather[0].description);
  domAddTemp("currentTemp", "The temperature is ", temp);
  domAddTemp("currentFeelsLike", "But feels like ", feels_like);
  domAddImage(weather[0].icon);
  domAddDays(weekday, d);
};

// function to add location details
export let domAddLocationDetails = (geoDistrict, geoCity, geoCountry) => {
  document.getElementById("locationId").textContent =
    "You are in " + geoDistrict + geoCity + geoCountry;
};

// function to add error message when location permission not allowed
export let errorLocation = () => {
  document.getElementById("locationId").textContent =
    "Please enable location permissions to get local weather, otherwise use search";
};

// function to add error message when location is not found and clear other data
export let errorSearchInput = (weatherHolder) => {
  weatherHolder.innerHTML = "";
  document.getElementById("currentDay").textContent = "";
  document.getElementById("currentWeather").textContent = "";
  document.getElementById("currentTemp").textContent = "";
  document.getElementById("currentFeelsLike").textContent = "";
  document.getElementById("image").src = "/icons/invisible.png";
  document.getElementById("locationId").textContent =
    "Sorry, I could not find that location. Please try again.";
};

// function to add error message when location is not found and clear other data
export let errorApiOffline = (weatherHolder) => {
  weatherHolder.innerHTML = "";
  document.getElementById("currentDay").textContent = "";
  document.getElementById("currentWeather").textContent = "";
  document.getElementById("currentTemp").textContent = "";
  document.getElementById("currentFeelsLike").textContent = "";
  document.getElementById("image").src = "/icons/invisible.png";
  document.getElementById("locationId").textContent =
    "Sorry, the API is offline";
};

// function to add error message for regex validation
export let errorNotLetters = (weatherHolder) => {
  weatherHolder.innerHTML = "";
  document.getElementById("currentDay").textContent = "";
  document.getElementById("currentWeather").textContent = "";
  document.getElementById("currentTemp").textContent = "";
  document.getElementById("currentFeelsLike").textContent = "";
  document.getElementById("image").src = "/icons/invisible.png";
  document.getElementById("locationId").textContent =
    "Sorry, I can only understand letters. Please try again";
};
