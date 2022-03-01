//function running of a loop to create HTML
export function getWeatherHTML(day, i, d, weekday) {
  return `<div class="weather_${i}">
                 <p id="weekday">${weekday[d.getDay() + i]}</p>
                 <p>I predict the weather will be ${
                   day.weather[0].main
                 }; more specifically ${day.weather[0].description}</p>
                <p>The temperature will be ${day.temp.day}°C</p>
                 <p>But will feel like ${day.feels_like.day}°C</p>
                 <img id="image" src="/icons/${
                   day.weather[0].icon
                 }.svg" alt="weatherIcon" />
                </div>`;
}
//function to add applicable icon
export function domAddImage(icon) {
  document.getElementById("image").src = `/icons/${icon}.svg`;
}
//functions to add details to the DOM
export function domAddWeather(id, weather, desc) {
  document.getElementById(id).textContent =
    "Currently, we are experiencing " + weather + "; more specifically " + desc;
}

export function domAddTemp(id, feel, temperature) {
  document.getElementById(id).textContent = feel + temperature + "°C";
}

export function domAddDays(weekday, d) {
  document.getElementById("currentDay").textContent = weekday[d.getDay() + 0];
}

export function domCurrentWeather(weekday, d, currentState) {
  const { temp, feels_like, weather } = currentState;
  domAddWeather("currentWeather", weather[0].main, weather[0].description);
  domAddTemp("currentTemp", "The temperature is ", temp);
  domAddTemp("currentFeelsLike", "But feels like ", feels_like);
  domAddImage(weather[0].icon);
  domAddDays(weekday, d);
}
export function domAddLocationDetails(geoDistrict, geoCity, geoCountry) {
  document.getElementById("locationId").textContent =
    "You are in " + geoDistrict + geoCity + geoCountry;
}
export function errorLocation() {
  document.getElementById("locationId").textContent =
    "Please enable location permissions to get local weather, otherwise use search";
}
export function errorSearchInput(weatherHolder) {
  weatherHolder.innerHTML = "";
  document.getElementById("currentDay").textContent = "";
  document.getElementById("currentWeather").textContent = "";
  document.getElementById("currentTemp").textContent = "";
  document.getElementById("currentFeelsLike").textContent = "";
  document.getElementById("image").src = "/icons/invisible.png";
  document.getElementById("locationId").textContent =
    "Sorry, I could not find that location. Please try again.";
}

function errorApiOffline(weatherHolder) {
  weatherHolder.innerHTML = "";
  document.getElementById("currentDay").textContent = "";
  document.getElementById("currentWeather").textContent = "";
  document.getElementById("currentTemp").textContent = "";
  document.getElementById("currentFeelsLike").textContent = "";
  document.getElementById("image").src = "/icons/invisible.png";
  document.getElementById("locationId").textContent =
    "Sorry, the API is offline";
}
