function getWeather(position) {
    const defaultCoords = { latitude: 45.034884, longitude: 38.975205 };

    let lat;
    let long;

    if (localStorage.getItem("latitude") && localStorage.getItem("longitude")) {
        lat = localStorage.getItem("latitude");
        long = localStorage.getItem("longitude");
    } else {
        const { latitude, longitude } = position?.coords ?? defaultCoords;

        lat = latitude;
        long = longitude;

        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
    }

    const fetchWeatherData = async () => {
        const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=55d3da6e8cf6878c7e722243e5972a19&lang=ru&units=metric`;

        try {
            const response = await fetch(weatherAPIUrl);
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            updateWeatherUI(data);
        } catch (error) {
            handleWeatherError(error);
        }
    };

    fetchWeatherData();
}

function updateWeatherUI(data) {
    const skeletonIcon = document.getElementById("skeletonIcon");
    const weatherInfo = document.getElementById("weatherInfo");
    const elemWeatherImg = document.getElementById("weatherImg");

    fadeOutElement(skeletonIcon, () => {
        weatherInfo.classList.add("animationStop");
    });

    // Update weather icon
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    elemWeatherImg.src = iconSrc;
    elemWeatherImg.onload = function () {
        elemWeatherImg.style.opacity = "1";
    };
    
    // Update weather location
    document.getElementById("weatherLocation").textContent = data.name;

    // Update temperature
    const temperature = Math.trunc(data.main.temp);
    document.getElementById("weatherTemp").textContent = formatTemperature(temperature);
}

function formatTemperature(temp) {
    return temp > 0 ? `+${temp}°` : `${temp}°`;
}

function fadeOutElement(element, callback) {
    element.style.opacity = "0";
    element.style.display = "none";
    setTimeout(callback, 1000);
}

function handleWeatherError(error) {
    const weatherInfo = document.getElementById("weatherInfo");
    const weatherLocation = document.getElementById("weatherLocation");
    weatherLocation.textContent = "Error loading";
    weatherInfo.style.color = "#fb7878";
    weatherInfo.classList.add("animationStop");
    console.error("Weather fetch error:", error);
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(getWeather, getWeather);
}

askForCoords();
