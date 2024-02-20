document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submit-btn");
    const cityInputField = document.getElementById("city-input-field");
    const tbody = document.querySelector(".weather-history-table tbody");
    submitBtn.addEventListener("click", function () {
        const cityName = cityInputField.value.trim();
        if (cityName !== "") {
            // Make an API request to fetch weather data
            fetchWeatherData(cityName);
        } else {
            alert("Please enter a valid city name.");
        }
    });

    function fetchWeatherData(city) {
        // Update this URL with your PHP file location
        const apiUrl = `./AadityaChaudharyTharu_2414024.php?city=${encodeURIComponent(city)}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    console.log(data);
                    updateCurrentWeatherUI(data.current_weather);
                    updateHistoricalWeatherUI(data.historical_weather);
                } else {
                    alert(`Error: ${data.message}`);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("Error fetching data. Please try again later.");
            });
    }

    function updateCurrentWeatherUI(currentWeather) {
        const { city_name, temperature, description, main, humidity, wind, pressure, weather_date, icon } =
            currentWeather;
        // Update the main weather information
        document.getElementById("city-header").textContent = city_name;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById("temperature").textContent = `${temperature} ℃`;
        document.getElementById("description").textContent = description;
        document.getElementById("main").textContent = main;
        document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
        document.getElementById("wind").textContent = `Wind: ${wind} m/s`;
        document.getElementById("pressure").textContent = `Pressure: ${pressure} Pa`;
        document.getElementById("datetime").textContent = `DateTime: ${weather_date}`;
    }

    function updateHistoricalWeatherUI(historicalWeather) {
        // Clear existing table rows
        tbody.innerHTML = "";
        // Loop through the historical data and update the table
        historicalWeather.forEach((entry) => {
            const iconUrl = `http://openweathermap.org/img/wn/${entry.icon}.png`;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${iconUrl}" alt="Weather Icon"></td>
                <td>${entry.temperature}℃</td>
                <td>${entry.description}</td>
                <td>${entry.main}</td>
                <td>${entry.humidity}%</td>
                <td>${entry.wind} m/s</td>
                <td>${entry.pressure} hPa</td>
                <td>${entry.weather_date}</td>
            `;
            tbody.appendChild(row);
        });
    }
    fetchWeatherData("Houston");
});
