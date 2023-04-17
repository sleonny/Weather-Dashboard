async function getWeather() {
  
  var cityName = document.getElementById("city").value;
  var stateCode = document.getElementById("state").value;
  var countryCode = document.getElementById("country").value;
  var apiKey = "3c648c734921941cb15d04ac851c1587"
  
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${apiKey}`;
                    
  try {
    // Send request to OpenWeatherMap API
    var response = await fetch(url);
    console.log(response);

    // Convert response to JSON
    var data = await response.json();

    // Get latitude and longitude from response
    var latitude = data[0].lat;
    var longitude = data[0].lon;

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

async function getForecast() {

  var cityName = document.getElementById("city").value;
  var stateCode = document.getElementById("state").value;
  var countryCode = document.getElementById("country").value;
  var apiKey = "3c648c734921941cb15d04ac851c1587";

  var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${apiKey}`;

  try {
    var response = await fetch(apiUrl);
    console.log(response);

    var data = await response.json();

    var latitude = data[0].lat;
    var longitude = data[0].lon;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    const forecastResponse = await fetch(forecastUrl);

    const forecastData = await forecastResponse.json();
    console.log(forecastData);

    for (let i = 0; i < forecastData.length; i += 5) {
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
    }
  } catch (error) {
    console.error("There was a problem fetching the forecast data:", error);
  }
}


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
 getForecast();
});
