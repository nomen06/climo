document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cityname");
    const popup = document.getElementById("weather-popup");
    const closeBtn = document.getElementById("close-popup");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const city = document.getElementById("city").value.trim();

        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        try {
            const response = await fetch("/get_weather", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ city: city })
            });

            const data = await response.json();

            if (response.ok) {
                cityName.textContent = `City: ${data.city}`;
                temperature.textContent = `Temperature: ${data.temperature}°C`;
                description.textContent = `Description: ${data.description}`;

                popup.style.display = "block"; 
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (err) {
            console.error("Fetch failed:", err);
            alert("⚠️ Failed to fetch weather data.");
        }
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
