const cities = [
    { name: 'Dhaka', lat: 23.7104, lon: 90.4074 },
    { name: 'Rangpur', lat: 25.7468, lon: 89.2517 },
    { name: 'Chittagong', lat: 22.3384, lon: 91.8317 },
    { name: 'Sylhet', lat: 24.8990, lon: 91.8717 },
    { name: 'Rajshahi', lat: 24.3740, lon: 88.6011 },
    { name: 'Khulna', lat: 22.8098, lon: 89.5644 }
];
let units = 'metric';

const weatherCards = document.getElementById('weather-cards');
const unitToggle = document.getElementById('unit-toggle');

// Map Open-Meteo weather codes to descriptions and OpenWeatherMap icons
const weatherCodeMap = {
    0: { description: 'Clear sky', icon: '01d' },
    1: { description: 'Mainly clear', icon: '02d' },
    2: { description: 'Partly cloudy', icon: '03d' },
    3: { description: 'Overcast', icon: '04d' },
    51: { description: 'Light drizzle', icon: '09d' },
    53: { description: 'Moderate drizzle', icon: '09d' },
    55: { description: 'Heavy drizzle', icon: '09d' },
    61: { description: 'Light rain', icon: '10d' },
    63: { description: 'Moderate rain', icon: '10d' },
    65: { description: 'Heavy rain', icon: '10d' },
    71: { description: 'Light snow', icon: '13d' },
    73: { description: 'Moderate snow', icon: '13d' },
    75: { description: 'Heavy snow', icon: '13d' },
    95: { description: 'Thunderstorm', icon: '11d' },
    default: { description: 'Unknown', icon: '50d' }
};

function getTempUnit() {
    return units === 'metric' ? '°C' : '°F';
}

function createWeatherCard(city, data) {
    const card = document.createElement('div');
    card.classList.add('card');
    const weather = weatherCodeMap[data.current_weather.weathercode] || weatherCodeMap.default;
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const temperature = Math.round(data.current_weather.temperature);
    const condition = weather.description;
    card.innerHTML = `
        <img src="${iconUrl}" alt="${condition}">
        <h2>${city}</h2>
        <h3>${temperature}${getTempUnit()}</h3>
        <p>${condition}</p>
    `;
    return card;
}

function createErrorCard(city, errorMessage) {
    const card = document.createElement('div');
    card.classList.add('card', 'error');
    card.innerHTML = `
        <h2>${city}</h2>
        <p>${errorMessage}</p>
    `;
    return card;
}

async function fetchWeather(cityObj) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityObj.lat}&longitude=${cityObj.lon}&current_weather=true&temperature_unit=${units === 'metric' ? 'celsius' : 'fahrenheit'}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Weather API request failed: ${response.status}`);
        const data = await response.json();
        if (!data.current_weather) throw new Error('No current weather data available');
        return createWeatherCard(cityObj.name, data);
    } catch (error) {
        console.error(`Error fetching weather for ${cityObj.name}:`, error.message);
        return createErrorCard(cityObj.name, 'Error fetching weather');
    }
}

async function loadWeather() {
    weatherCards.innerHTML = '';
    for (const city of cities) {
        const card = await fetchWeather(city);
        weatherCards.appendChild(card);
    }
}

unitToggle.addEventListener('change', () => {
    units = unitToggle.checked ? 'imperial' : 'metric';
    loadWeather();
});

window.addEventListener('load', loadWeather);