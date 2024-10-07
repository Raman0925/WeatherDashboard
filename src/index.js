const apiKey = "5edf3581f9a564b29a74438eeb97cf3e";
const submitButton = document.getElementById('submitButton')


const displayforecast = (data) => {
    const forecastContainer = document.getElementById('forecast_weather');
    

}
const displayweather = (data) => {
    const weatherContainer = document.getElementById('current_weather');
    const location = `${data.name}, ${data.sys.country}`;
    const temperature = data.main.temp;
    const weatherCondition = data.weather[0].main;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const visibility = data.visibility / 1000; // Convert to kilometers
    const pressure = data.main.pressure;

    weatherContainer.innerHTML = `
        <h2>Weather in ${location}</h2>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Condition:</strong> ${weatherCondition} - ${weatherDescription}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Visibility:</strong> ${visibility} km</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
    `;

    
}



const forecastInfoFetch = async (location,weather_api ) =>{
    try {
        const response = await fetch(weather_api);
        const responseJson = await response.json();
        if (response.ok) {
          
          // ...do something with the response
          displayforecast(responseJson)
        } else {
          // Custom message for failed HTTP codes
          if (response.status === 404) throw new Error("404, Not found");
          if (response.status === 500)
            throw new Error("500, internal server error");
          // For any other server error
          throw new Error(response.status);
        }
      } catch (error) {
        console.error("Fetch", error);
        // Output e.g.: "Fetch Error: 404, Not found"
      }

}

const weatherInfoFetch = async (location,weather_api ) =>{
    try {
        const response = await fetch(weather_api);
        const responseJson = await response.json();
        if (response.ok) {
          
          // ...do something with the response
          displayweather(responseJson)
        } else {
          // Custom message for failed HTTP codes
          if (response.status === 404) throw new Error("404, Not found");
          if (response.status === 500)
            throw new Error("500, internal server error");
          // For any other server error
          throw new Error(response.status);
        }
      } catch (error) {
        console.error("Fetch", error);
        // Output e.g.: "Fetch Error: 404, Not found"
      }

}

const fetchingInfohandler =  () => {
   
 
  const location = document.getElementById("city").value;
  const weather_api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
  weatherInfoFetch(location,weather_api);
  forecastInfoFetch(location,weather_api);

};
submitButton.addEventListener('click',fetchingInfohandler)
