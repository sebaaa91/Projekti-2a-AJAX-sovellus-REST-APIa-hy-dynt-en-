// Function etsimään sää dataa
function getWeatherData(city) {
    // Vaihtaa 'YOUR_API_KEY' oikeaan API avaimeen, mikä sain nettisivulta
    const apiKey = 'e06c334215713d3652abec19303a99b3';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e06c334215713d3652abec19303a99b3`;

    // Tekee AJAX requestin
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                
                const data = JSON.parse(xhr.responseText);

                // Display valittu  data
                displayWeatherData(data);
            } else {
                console.error(`Error: ${xhr.status}`);
            }
        }
    };

    xhr.open("GET", apiUrl, true);
    xhr.send();
}

// Function to display sää datan
function displayWeatherData(data) {
    const resultContainer = document.getElementById("weatherResult");
    resultContainer.innerHTML = ""; 

    // Katsoo oliko API request onnistunut
    if (data.cod === 200) {
        // Extract and display valitun datan (esim, lämpötilan ja pilvisyyden)
        const temperature = data.main ? data.main.temp : 'N/A';
        const description = data.weather ? data.weather[0].description : 'N/A';

        resultContainer.innerHTML = `<p>Temperature: ${temperature} C</p>`;
        resultContainer.innerHTML += `<p>Weather description: ${description}</p>`;
    } else {
        resultContainer.innerHTML = `<p>${data.message}</p>`;
    }
}

// Event handler haku nappulalle
function searchWeather() {
    const cityInput = document.getElementById("cityInput");
    const cityName = cityInput.value.trim();

    if (cityName !== "") {
        // Pyydä funktionia hakemaan sää datan 
        getWeatherData(cityName);
    } else {
        alert("Please enter a city name.");
    }
    
    // Function etsimään sää dataa
    function getWeatherData(city) {
        const apiKey = 'e06c334215713d3652abec19303a99b3';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e06c334215713d3652abec19303a99b3`;
    
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    displayWeatherData(data);
                } else if (xhr.status === 404) {
                    // 404 error (city not found)
                    alert("City not found. Please check the city name.");
                } else {
                    console.error(`Error: ${xhr.status}`);
                }
            }
        };
    
        xhr.open("GET", apiUrl, true);
        xhr.send();
    }
    
    
    
    
}

// Lisää event listener haku nappulaan
document.getElementById("searchBtn").addEventListener("click", searchWeather);
