document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const city = document.getElementById('city-input').value;
  const apiKey = 'd3d8bd04639f3b57ff1c15d624064630';
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(weatherData => {
      if (weatherData && weatherData.main && weatherData.main.temp) {
        const temperature = Math.round(weatherData.main.temp - 273.15); 
        const description = weatherData.weather[0].description;

        document.getElementById('weather-info').innerHTML = `
          <p>Temperature:</p>
          <p class="temperature">${temperature}&deg;C</p>
          <p class="description">${description}</p>
        `;

        const pexelsApiKey = 't55JsDB4A5n1Bm1dtI74rhLK65M9abqIvvNp2gbztN4BSXjVnS2OQhrc';
        const pexelsApiUrl = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;

        fetch(pexelsApiUrl, {
          headers: {
            Authorization: pexelsApiKey
          }
        })
          .then(response => response.json())
          .then(photoData => {
            if (photoData && photoData.photos && photoData.photos.length > 0) {
              const photoUrl = photoData.photos[0].src.large2x;
              document.querySelector('.img').style.backgroundImage = `url(${photoUrl})`;
            } else {
              document.querySelector('.img').style.backgroundImage = '';
            }
          })
          .catch(error => {
            console.error('Error:', error);
            document.querySelector('.img').style.backgroundImage = '';
          });
      } else {
        document.getElementById('weather-info').innerHTML = '<p>No weather data available.</p>';
        document.querySelector('.img').style.backgroundImage = ''; 
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('weather-info').innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
      document.querySelector('.img').style.backgroundImage = ''; 
    });
});
