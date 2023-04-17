



async function getWeather() {
  
  const cityName = document.getElementById("city").value;
  const stateCode = document.getElementById("state").value;
  const countryCode = document.getElementById("country").value;
  const apiKey = "3c648c734921941cb15d04ac851c1587"
  
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${apiKey}`;
                    
  try {
    // Send request to OpenWeatherMap API
    const response = await fetch(url);
    console.log(response);

    // Convert response to JSON
    const data = await response.json();

    // Get latitude and longitude from response
    const latitude = data[0].lat;
    const longitude = data[0].lon;

    // Build URL for weather API with latitude, longitude, and API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    // Send request to weather API
    const weatherResponse = await fetch(weatherUrl);

    // Convert response to JSON
    const weatherData = await weatherResponse.json();

    
    // Log weather data to console
    console.log(weatherData);
  
    document.getElementById('city').textContent = weatherData.main.name;
    $(document).ready(function() {
      var currentDate = new Date();
      var datetimeString = currentDate.toLocaleString();
      $('#date').text(datetimeString);
    });
    const tempInKelvin = weatherData.main.temp;
    const tempInFaren = (tempInKelvin - 273.15) * 1.8 + 32;
    const tempConvert = tempInFaren.toFixed(0);
    document.getElementById('icon').textContent = weatherData.weather[0].icon;
    document.getElementById('temp').textContent = tempConvert;
    document.getElementById('weather').textContent = weatherData.weather[0].description;
    document.getElementById('humidity').textContent = weatherData.main.humidity
    document.getElementById('wind').textContent = weatherData.wind.speed;
  } 
  catch (error) {
    console.log(error);
  }
}
const cityName = document.getElementById("city").value;
  const stateCode = document.getElementById("state").value;
  const countryCode = document.getElementById("country").value;
  const apiKey = "3c648c734921941cb15d04ac851c1587"
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

fetch(apiUrl)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Network response was not ok.");
    }
  })
  .then((data) => {
    const forecastData = data.list;
    const forecastContainer = document.getElementById("forecast");

    for (let i = 0; i < forecastData.length; i += 8) {
      const forecastItem = forecastData[i];
      const forecastDate = new Date(forecastItem.dt_txt);
      const forecastIcon = forecastItem.weather[0].icon;
      const forecastTemp = forecastItem.main.temp;
      const forecastHumidity = forecastItem.main.humidity;
      const forecastWind = forecastItem.wind.speed;
      document.getElementById('forecast-date').textContent = new Date(forecastItem.dt_txt);
      document.getElementById('forecast-icon').textContent = forecastItem.weather[0].icon;
      document.getElementById('forecast-temperature').textContent = forecastItem.main.temp;
      document.getElementById('forecast-humidity').textContent = forecastItem.main.humidity;
      document.getElementById('forecast-wind').textContent = forecastItem.wind.speed;
     ;
      
    }
  })
  .catch((error) => {
    console.error("There was a problem fetching the forecast data:", error);
  });


function formatUnixTimestamp(timestamp) {
  // Convert Unix timestamp to milliseconds
  const date = new Date(timestamp * 1000);

  // Format date and time string in UTC format
  const options = {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return date.toLocaleString("en-US", options);
}

var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function() {
  getWeather();
 
});
