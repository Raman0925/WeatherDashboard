const apiKey = "5edf3581f9a564b29a74438eeb97cf3e";
const submitButton = document.getElementById("submitButton");

// Utility function to create weather elements
const createWeatherElement = (label, value) => {
  const paragraph = document.createElement("p");
  paragraph.innerHTML = `<strong>${label}:</strong> ${value}`;
  return paragraph;
};

// Function to create a current weather card
const createWeatherCard = (location, data) => {
  const card = document.createElement("div");
  card.classList.add("weather-card");

  const title = document.createElement("h2");
  title.textContent = `Weather in ${location}`;
  card.appendChild(title);

  const temperatureElement = createWeatherElement("Temperature", `${data.main.temp}°C`);
  const conditionElement = createWeatherElement("Condition", `${data.weather[0].main} - ${data.weather[0].description}`);
  const humidityElement = createWeatherElement("Humidity", `${data.main.humidity}%`);
  const windSpeedElement = createWeatherElement("Wind Speed", `${data.wind.speed} m/s`);
  const visibilityElement = createWeatherElement("Visibility", `${data.visibility / 1000} km`);
  const pressureElement = createWeatherElement("Pressure", `${data.main.pressure} hPa`);

  // Append all elements to the card
  card.appendChild(temperatureElement);
  card.appendChild(conditionElement);
  card.appendChild(humidityElement);
  card.appendChild(windSpeedElement);
  card.appendChild(visibilityElement);
  card.appendChild(pressureElement);

  return card;
};

// Function to display current weather
const displayWeather = (data) => {
  const weatherContainer = document.getElementById("current_weather");
  weatherContainer.innerHTML = ''; // Clear previous data
  const location = `${data.name}, ${data.sys.country}`;
  const weatherCard = createWeatherCard(location, data);
  weatherContainer.appendChild(weatherCard);
};

// Function to create a forecast card
const createForecastCard = (date, data) => {
  const card = document.createElement("div");
  card.classList.add("weather-card");

  const title = document.createElement("h3");
  title.textContent = `Forecast for ${date}`;
  card.appendChild(title);
  const imageContainer  = document.createElement('img')
  imageContainer.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  const temperatureElement = createWeatherElement("Temperature", `${data.main.temp}°C`);
  const conditionElement = createWeatherElement("Condition", `${data.weather[0].main} - ${data.weather[0].description}`);
  const humidityElement = createWeatherElement("Humidity", `${data.main.humidity}%`);
  const windSpeedElement = createWeatherElement("Wind Speed", `${data.wind.speed} m/s`);

  // Append all elements to the forecast card
  card.appendChild(imageContainer)
  card.appendChild(temperatureElement);
  card.appendChild(conditionElement);
  card.appendChild(humidityElement);
  card.appendChild(windSpeedElement);

  return card;
};

// Function to display forecast data
const displayForecast = (forecastData) => {
  const forecastContainer = document.getElementById("forecast_weather");
  forecastContainer.innerHTML = ''; // Clear previous data
  const  populateForecastData = (dayData) => {
    const date = new Date(dayData.dt * 1000).toLocaleDateString();
    const forecastCard = createForecastCard(date, dayData);
    forecastContainer.appendChild(forecastCard);
  }

  forecastData.forEach(populateForecastData);
};

// Generic function to handle API fetch requests
const fetchWeatherData = async (url, displayFunction) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (response.ok) {
      displayFunction(responseJson);
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
const fetchForeCastData = async (url, displayFunction) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (response.ok) {
      displayFunction(responseJson.list);
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Event handler for fetching weather and forecast data
const fetchingInfoHandler = () => {
  const location = document.getElementById("city").value;
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  fetchWeatherData(weatherApi, displayWeather);
  fetchForeCastData(forecastApi, displayForecast);
};

submitButton.addEventListener("click", fetchingInfoHandler);
