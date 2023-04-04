async function getWeather() {
  var cityName = document.getElementById("city").value;
  var stateCode = document.getElementById("state").value;
  var countryCode = document.getElementById("country").value;
  apiKey = "3c648c734921941cb15d04ac851c1587"
  
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${apiKey}`;
                    
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
  apiKey = "3c648c734921941cb15d04ac851c1587"
  
  var urlF = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${stateCode},${countryCode}&appid=${apiKey}`;
                    
  try {
    // Send request to OpenWeatherMap API
    const responseF = await fetch(urlF);

    // Convert response to JSON
    const dataF =  await responseF.json()
    // Get time of data forecasted and format it
    const timestamp = dataF.list[0].dt;
    const formattedTimestamp = formatUnixTimestamp(timestamp);

    // Display formatted timestamp on the DOM
    const timeElement = document.getElementById("forecastTime");
    timeElement.textContent = `Time of data forecasted (UTC): ${formattedTimestamp}`;

    // Log forecast data to console
    console.log(dataF);
  } catch (error) {
    console.log(error);
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
