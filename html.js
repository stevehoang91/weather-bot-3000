export function getWeatherHTML(day, i, d, weekday) {
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

export function domAddImage(icon) {
  document.getElementById("image").src = `/icons/${icon}.svg`;
}

export function domAddWeather(id, weather, desc) {
  document.getElementById(id).textContent =
    "Currently, we are experiencing " + weather + "; more specifically " + desc;
}

export function domAddTemp(id, feel, temperature) {
  document.getElementById(id).textContent = feel + temperature + "°C";
}
