document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const city = document.getElementById('city-input').value;
    const apiKey = 'd3d8bd04639f3b57ff1c15d624064630';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(weatherApiUrl)
      .then((response) => response.json())
      .then((weatherData) => {
        if (weatherData && weatherData.main && weatherData.main.temp) {
          const weatherCondition = weatherData.weather[0].main.toLowerCase();
          setWeatherImage(weatherCondition);
        } else {
          clearWeatherImage();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        clearWeatherImage();
      });
  });
  
  function setWeatherImage(weatherCondition) {
    const bodyElement = document.body;
  
    bodyElement.className = '';
  
    if (weatherCondition === 'clear') {
      bodyElement.classList.add('sunny-image');
    } else if (weatherCondition === 'clouds') {
      bodyElement.classList.add('cloudy-image');
    } else if (weatherCondition === 'rain' || weatherCondition === 'drizzle') {
      bodyElement.classList.add('rainy-image');
    } else if (weatherCondition === 'snow') {
      bodyElement.classList.add('snowy-image');
    }
   
  }
  
  function clearWeatherImage() {
    document.body.className = '';
  }
  