const buttonValidate = document.querySelector('button');
const gps = document.querySelector('#gps');
const city = document.querySelector('#city');
const temperature = document.querySelector('#temperature');
const details = document.querySelector('#details');

let coordinates = [];

/*****PRINCIPALE FUNCTION***
***************************/
async function fetchCoordinates(cityChoice) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityChoice}&format=json&addressdetails=1&limit=1`);
        const dataCoordinates = await response.json();

        city.innerText = dataCoordinates[0].name;
        gps.innerText = `Coordonnées GPS: ${dataCoordinates[0].lat}, ${dataCoordinates[0].lon}`;
        coordinates.push(dataCoordinates[0].lat);
        coordinates.push(dataCoordinates[0].lon);

        fetchWeather(coordinates[0], coordinates[1]);

    } catch (error) {
        console.error("Failed to catch data :", error);
        city.innerText = "Ville non-trouvée";
        gps.innerText = "-";
        temperature.innerText = "-";
        details.innerText = "Vérifiez le nom de la ville";
    }
}

async function fetchWeather(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m`);
        const dataWeather = await response.json();

        let AlldataWeather = dataWeather.current;
        let temp = AlldataWeather.temperature_2m;
        
        temperature.innerText = `${temp}°C`;
        details.innerText = "Température actuelle";

    } catch (error) {
        console.error("Failed to catch data :", error);
    }
}


/****START*****
**************/
buttonValidate.addEventListener('click', () => {
    coordinates = [];
    const cityInput = document.querySelector('#cityInput').value;
    fetchCoordinates(cityInput);
})