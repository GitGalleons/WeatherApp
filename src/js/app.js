const apiKey = '8a2c24326ccfff1c044b23261e7230f6';
const cities = ['Dhaka','Rangpur', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna'];
let units = 'metric';

const weatherCards = document.getElementById('weather-cards');
const unitToggle = document.getElementById('unit-toggle');

async function getCoordinates(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Geocoding API request failed');
        const data = await response.json();
        if (data.length === 0) throw new Error('City not found');
        return { lat: data[0].lat, lon: data[0].lon };
    } catch (error) {
        console.error(`Error fetching coordinates for ${city}:`, error.message);
        throw error;
    }
}

function getTempUnit() {
    return units === 'metric' ? '°C' : '°F';
}

function createWeatherCard(city, data) {
    const card = document.createElement('div');
    card.classList.add('card');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temperature = Math.round(data.main.temp);
    const condition = data.weather[0].description;
    card.innerHTML = `
        <img src="${iconUrl}" alt="${condition}">
        <h2>${city}</h2>
        <h3>${temperature}${getTempUnit()}</h3>
        <p>${condition}</p>
    `;
    return card;
}

function createErrorCard(city) {
    const card = document.createElement('div');
    card.classList.add('card', 'error');
    card.innerHTML = `
        <h2>${city}</h2>
        <p>Error fetching weather</p>
    `;
    return card;
}

async function fetchWeather(city) {
    try {
        const { lat, lon } = await getCoordinates(city);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather API request failed');
        const data = await response.json();
        if (data.cod !== 200) throw new Error(data.message);
        return createWeatherCard(city, data);
    } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error.message);
        return createErrorCard(city);
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