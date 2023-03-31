function buildUrl () {
  
}

async function getWeather() {
  var cityName = document.getElementById("city").value;
  var stateCode = document.getElementById("state").value;
  var countryCode = document.getElementById("country").value;
  apiKey = "3c648c734921941cb15d04ac851c1587"
  
  var url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${apiKey}`;

  try {
    // Send request to OpenWeatherMap API
    const response = await fetch(url);

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
    document.getElementById('temp').textContent = weatherData.main.temp;
    document.getElementById('weather').textContent = weatherData.weather[0].description;
    document.getElementById('wind').textContent = weatherData.wind.speed;
   
  } catch (error) {
    console.log(error);
  }
}

var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", getWeather);
  
