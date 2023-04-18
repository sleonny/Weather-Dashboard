async function getWeather() {
  
  var cityName = document.getElementById("city").value;
  var stateCode = document.getElementById("state").value;
  var countryCode = document.getElementById("country").value;
  var apiKey = "3c648c734921941cb15d04ac851c1587"
  
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${apiKey}`;
                    
  
  try {
   var response = await fetch(url);
    console.log(response);

    var data = await response.json();

   var latitude = data[0].lat;
    var longitude = data[0].lon;

    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

   
    const weatherResponse = await fetch(weatherUrl);

    
    const weatherData = await weatherResponse.json();
   console.log(weatherData);
  
    document.getElementById('city').textContent = weatherData.main.name;
    $(document).ready(function() {
      var currentDate = new Date();
      var datetimeString = currentDate.toLocaleString();
      $('#date').text(datetimeString);
    });
    var tempInKelvin = weatherData.main.temp;
    var tempInFaren = (tempInKelvin - 273.15) * 1.8 + 32;
    var tempConvert = tempInFaren.toFixed(0);
    document.getElementById('icon').textContent = weatherData.weather[0].icon;
    document.getElementById('temp').textContent = tempConvert + "F";
    document.getElementById('weather').textContent = weatherData.weather[0].description;
    document.getElementById('humidity').textContent = weatherData.main.humidity + "%";
    document.getElementById('wind').textContent = weatherData.wind.speed + "mph";
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

    var forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous content
    var currentDate = new Date(); // Get current date
    var dayCount = 0; // Counter for number of forecast days displayed
    
    for (var i = 0; i < forecastData.list.length; i++) {
      var forecastItem = forecastData.list[i];
      var forecastDate = new Date(forecastItem.dt_txt);
    
      // Check if the forecast item is for a new day
      if (forecastDate.getDate() !== currentDate.getDate()) {
        dayCount++; // Increment day count
        currentDate = forecastDate; // Update current date
    
        // Display forecast item if it's a new day and we haven't displayed 5 days yet
        if (dayCount <= 5) {
          var forecastItemDiv = document.createElement('div');
          var forecastDateElem = document.createElement('p');
          var forecastIconElem = document.createElement('p');
          var forecastTempElem = document.createElement('p');
          var forecastHumidityElem = document.createElement('p');
          var forecastWindElem = document.createElement('p');

          var tempInKelvin = forecastItem.main.temp;
          var tempInFaren = (tempInKelvin * 1.8) - 459.67;
          var tempConvert = tempInFaren.toFixed(0);
    
          // Set content for new elements
          forecastDateElem.textContent = forecastDate.toLocaleDateString();
          forecastIconElem.textContent = forecastItem.weather[0].icon;
          forecastTempElem.textContent = tempConvert + 'F';
          forecastHumidityElem.textContent = forecastItem.main.humidity;
          forecastWindElem.textContent = forecastItem.wind.speed;
    
          // Append new elements to forecast container
          forecastItemDiv.appendChild(forecastDateElem);
          forecastItemDiv.appendChild(forecastIconElem);
          forecastItemDiv.appendChild(forecastTempElem);
          forecastItemDiv.appendChild(forecastHumidityElem);
          forecastItemDiv.appendChild(forecastWindElem);
          forecastContainer.appendChild(forecastItemDiv);
        }
      }
    
      // Exit the loop after displaying 5 days of forecast
      if (dayCount === 5) {
        break;
      }
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
