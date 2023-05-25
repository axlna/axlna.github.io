document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const city = document.getElementById('city-input').value;
    const apiKey = 'd3d8bd04639f3b57ff1c15d624064630';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        
        if (data && data.main && data.main.temp) {
          const temperature = Math.round(data.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
          const description = data.weather[0].description;
  
          document.getElementById('weather-info').innerHTML = `
            <p>Temperature:</p>
            <p class="temperature">${temperature}&deg;C</p>
            <p class="description">${description}</p>
          `;
        } else {
          document.getElementById('weather-info').innerHTML = '<p>No weather data available.</p>';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('weather-info').innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
      });
  });
  