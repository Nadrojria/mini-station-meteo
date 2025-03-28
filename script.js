const buttonValidate = document.querySelector('button');
const gps = document.querySelector('#gps');
const city = document.querySelector('#city');

async function fetchCoordinates(cityInput) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityInput}&format=json&addressdetails=1&limit=1`);
        const dataCoordinates = await response.json();

        dataCoordinates.forEach(element => {
            city.innerText = element.name;
            gps.innerText = `Coordonnées GPS: ${element.lat}, ${element.lon}`;
        })

        // for (const element of dataCoordinates) {
        //     console.log(element.lat);
        //     console.log(element.lon);
        //     city.innertext = element.name;
        //     console.log(element.name);
        //     gps.innertext = `Coordonnées GPS: ${element.lat}, ${element.lon}`;
        // }
        
    } catch (error) {
        console.error("Failed to catch data :", error);
    }
}

buttonValidate.addEventListener('click', () => {
    const cityInput = document.querySelector('#cityInput').value;
    fetchCoordinates(cityInput);
})
