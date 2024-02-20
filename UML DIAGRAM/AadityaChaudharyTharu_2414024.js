/**
 * This function is triggered when the DOM is loaded. It sets up event listeners
 * for the submit button and the input field for entering a city. When the submit
 * button is clicked, the function makes an API request to fetch weather data for
 * the entered city.
 */
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submit-btn");
    const cityInputField = document.getElementById("city-input-field");
    const tbody = document.querySelector(".weather-history-table tbody");
    /**
     * This function is called when the submit button is clicked. It checks if the
     * entered city is valid, and if so, makes an API request to fetch weather data.
     * If the entered city is invalid, an error is displayed.
     */
    submitBtn.addEventListener("click", function () {
        const cityName = cityInputField.value.trim();
        if (cityName !== "") {
            // Make an API request to fetch weather data
            fetchWeatherData(cityName);
        } else {
            alert("Please enter a valid city name.");
        }
    });
    /**
     * This function makes an API request to fetch weather data for the specified
     * city. The response is parsed as JSON and the relevant data is used to update
     * the UI with the current weather information. If an error occurs, an error
     * message is displayed.
     *
     * @param {string} city - The city for which to fetch weather data
     */
    function fetchWeatherData(city) {
        // Update this URL with your PHP file location
        const apiUrl = `./AadityaChaudharyTharu_2414024.php?city=${encodeURIComponent(city)}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("historical_weather", JSON.stringify(data.historical_weather))
                localStorage.setItem("current_weather", JSON.stringify(data.current_weather))
                
                
                if (data.status === "success") {
                    console.log(data);
                    updateCurrentWeatherUI(data.current_weather);
                    updateHistoricalWeatherUI(data.historical_weather);
                } else {
              
                    alert(`Error: ${data.message}`);
                    localstoragedata();                
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("Error fetching data. Please try again later.");
                localstoragedata();
            });
    }
    function localstoragedata (){
                    const storecurrentdata = localStorage.getItem("current_weather");
                    const storehistoricaldata = localStorage.getItem("historical_weather");
                    if (storecurrentdata){
              
                        const currentdata = JSON.parse(storecurrentdata);
                        updateCurrentWeatherUI(currentdata);
                    }
                    if(storehistoricaldata){
                        const historicaldata= JSON.parse(storehistoricaldata);
                    
                        updateHistoricalWeatherUI(historicaldata);
                    }
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
    /**
     * This function updates the UI with the historical weather data for the specified
     * city.
     *
     * @param {array} historicalWeather - The historical weather data for the specified city
     */
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
                <td>${entry.pressure}Pa</td>
                <td>${entry.weather_date}</td>
            `;
            tbody.appendChild(row);
        });
    }
    fetchWeatherData("Houston");
});
