async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherBox = document.getElementById("weatherData");

    if (!city) {
        weatherBox.innerHTML = `<p style="color:red;">⚠ Please enter a city</p>`;
        return;
    }

    const apiKey = "37f5505381f76e2f8f8233f10d238aaa"; // 🔥 Replace this
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    weatherBox.innerHTML = `<p>⏳ Loading...</p>`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const cityName = data.name;
        const country = data.sys.country;
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const pressure = data.main.pressure;
        const minTemp = Math.round(data.main.temp_min);
        const maxTemp = Math.round(data.main.temp_max);

        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        weatherBox.innerHTML = `
    <div class="weather-card">
        <h2>${cityName}, ${country}</h2>

        <img src="${iconUrl}" alt="weather icon">

        <h1>${temp}°C</h1>
        <p class="desc">${desc}</p>

        <div class="details-grid">
            <div class="detail-card">
                <p>💧</p>
                <span>Humidity</span>
                <h3>${humidity}%</h3>
            </div>

            <div class="detail-card">
                <p>🌬</p>
                <span>Wind</span>
                <h3>${wind} m/s</h3>
            </div>

            <div class="detail-card">
                <p>📊</p>
                <span>Pressure</span>
                <h3>${pressure} hPa</h3>
            </div>

            <div class="detail-card">
                <p>🌡</p>
                <span>Min / Max</span>
                <h3>${minTemp}° / ${maxTemp}°</h3>
            </div>
        </div>
    </div>
`;

    } catch (error) {
        weatherBox.innerHTML = `<p style="color:red;">❌ City not found</p>`;
    }
}