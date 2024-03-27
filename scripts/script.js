function getWeather() {

    // assigning the weather API and the city value to apiKey and city constants
        const apiKey = '98863b3e7daeb200375298abb0d3b51b';
        const city = document.getElementById('city').value;


    // check if there is something entered when search button is pressed
    if (!city) {
        alert('Please enter a city');
        return;
    }

    // assigning weather forecasts to new constants
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // getting weather data from website and an alert if unavailable
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
               displayWeather(data); 
    })
        .catch(error => {
                console.error('Error fetching current weather data:', error);
                alert('Error fetching current weather data. Please try again.');
    });

    // getting hourly data from website and an alert if unavailable
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
                console.error('Error fetching hourly forecast data:', error);
                alert('Error fetching hourly forecast data. Please try again.');
        })

}


function displayWeather(data) {

    // creating containers for info to be displayed
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // clearing previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    // check if there is a weather data error and notifying the user
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else { 

        // if there is no error detected the function will extract the hourly data from the site
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;


        // changing the HTML to display the extracted info from above
        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {

    // container where hourly forecast will be displayed
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    // using a forEach loop to extract data and update the html
    next24Hours.forEach(item => {

        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        // html updates
        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {

    // displaying the image of the weather icon
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}