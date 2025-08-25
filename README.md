<xaiArtifact artifact_id="18523b54-84dc-4242-b3a1-c969481a5774" artifact_version_id="68f022f5-e1a1-46a7-a907-dfaaa5695582" title="README.md" contentType="text/markdown">

# Weather App

A responsive web application that displays current weather data for multiple cities in Bangladesh using the Open-Meteo API. The app features a card-based UI, a toggle for switching between Celsius and Fahrenheit, and robust error handling.

## Features
- Displays weather data for Dhaka, Rangpur, Chittagong, Sylhet, Rajshahi, and Khulna.
- Shows weather icons, temperature, city name, and weather conditions in a card-based layout.
- Allows toggling between Celsius and Fahrenheit units.
- Responsive design with modern CSS (rounded cards, shadows, hover effects).
- Uses Open-Meteo API for weather data (no API key required).
- Includes error handling for failed API calls.

## Technologies Used
- **HTML**: Structure of the web page.
- **CSS**: Styling for responsive cards and toggle switch.
- **JavaScript**: Fetches weather data and dynamically updates the UI.
- **Open-Meteo API**: Provides weather data based on latitude and longitude.

## Setup Instructions
1. **Clone or Download**: Download the project files (`index.html`, `styles.css`, `app.js`).
2. **Place Files**: Ensure all files are in the same directory.
3. **Open the App**: Open `index.html` in a modern web browser (e.g., Chrome, Firefox).
4. **No API Key Needed**: The app uses Open-Meteo, which requires no API key.

## File Structure
- `index.html`: Main HTML file with the app structure and toggle switch.
- `styles.css`: CSS file for styling the cards, toggle, and responsive layout.
- `app.js`: JavaScript file for fetching weather data and updating the UI.

## Usage
- The app automatically loads weather data for the specified cities on page load.
- Toggle between Celsius and Fahrenheit using the switch at the top.
- Each city’s weather is displayed in a card with an icon, temperature, and condition.
- If an API call fails, an error message is shown in the respective city’s card.

## Notes
- **API**: Uses Open-Meteo’s free weather API (`https://api.open-meteo.com/v1/forecast`). No authentication or API key is required.
- **Icons**: Weather icons are sourced from OpenWeatherMap’s icon set for visual consistency.
- **Coordinates**: City coordinates are hardcoded to avoid external geocoding API calls.
- **Error Handling**: The app handles network errors and invalid data gracefully, displaying user-friendly messages.

## Troubleshooting
- **No Data Displayed**: Check your internet connection and open the browser console (F12) for error messages.
- **Styling Issues**: Ensure `styles.css` is correctly linked in `index.html`.
- **Browser Compatibility**: Use a modern browser with JavaScript enabled.

## Future Improvements
- Add a search bar to fetch weather for user-specified cities (requires a geocoding API).
- Include additional weather details (e.g., humidity, wind speed).
- Use a custom weather icon set for better performance.

## License
This project is open-source and available under the MIT License.

</xaiArtifact>