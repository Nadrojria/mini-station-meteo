const buttonValidate = document.querySelector('button');
const gps = document.querySelector('#gps');
const city = document.querySelector('#city');
const temperature = document.querySelector('#temperature');

let coordonates = [];

/*****PRINCIPALE FUNCTION***
***************************/
async function fetchCoordinates(cityChoice) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityChoice}&format=json&addressdetails=1&limit=1`);
        const dataCoordinates = await response.json();

        for (const element of dataCoordinates) {
            city.innerText = element.name;
            gps.innerText = `Coordonnées GPS: ${element.lat}, ${element.lon}`;
            coordonates.push(element.lat);
            coordonates.push(element.lon);
        }
        
    } catch (error) {
        console.error("Failed to catch data :", error);
    }
}

async function fetchWeather(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m`);
        const dataWeather = await response.json();

        let AlldataWeather = dataWeather.current;
        let temp = AlldataWeather.temperature_2m;
        
        temperature.innerText = temp;

    } catch (error) {
        console.error("Failed to catch data :", error);
    }
}


/****START*****
**************/
buttonValidate.addEventListener('click', async () => {
    coordonates = [];
    const cityInput = document.querySelector('#cityInput').value;
    await fetchCoordinates(cityInput);
    console.log(coordonates);
    fetchWeather(coordonates[0], coordonates[1]); // Ca ne fonctionne pas sans que je rajoute un await (+async) devant la fonction fetchCoordinates car on doit attendre ses push dans le tableau avant de pouvoir les exploiter dans lafocntion suivante.
})