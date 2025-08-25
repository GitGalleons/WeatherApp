const apiKey = "YOUR_API_KEY";
let isCelsius = true;
const cities = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur"];
const container = document.getElementById("weather-container");
const toggleBtn = document.getElementById("unit-toggle");

async function fetchWeather(city) {
  const unit = isCelsius ? "metric" : "imperial";
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},BD&units=${unit}&appid=${apiKey}`);
  return await res.json();
}

async function displayWeather() {
  container.innerHTML = "";
  for (const city of cities) {
    const data = await fetchWeather(city);
    if (data.cod === 200) {
      container.innerHTML += `
        <div class="card">
          <h2>${data.name}</h2>
          <p>${Math.round(data.main.temp)}°${isCelsius ? "C" : "F"}</p>
          <p>${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind: ${data.wind.speed} ${isCelsius ? "m/s" : "mph"}</p>
        </div>
      `;
    }
  }
}

toggleBtn.addEventListener("click", () => {
  isCelsius = !isCelsius;
  toggleBtn.textContent = `Switch to ${isCelsius ? "°F" : "°C"}`;
  displayWeather();
});

displayWeather();
