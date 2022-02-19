const apikey = '5474717f32428a5ac931881c8ccdbdf4';
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getWeatherByCity(city) {
    const response = await fetch(url(city));
    const data = await response.json();
    if (response.status == '404') {
        alert("Enter the correct city name!");
    }

    console.log(data);
    console.log(KtoC(data.main.temp));
    addWeatherToPage(data);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);
    const low = KtoC(data.main.temp_min);
    const hi = KtoC(data.main.temp_max);
    const weather = document.createElement('div');
    const cityname = CapFirstLetter(search.value);
    weather.classList.add('weather');
    weather.innerHTML = `
    <h3>${cityname}</h3>
    <h2>${temp}°C</h2>
    <h6>H: ${hi}°C  L: ${low}°C</h6>
    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
    `;

    main.innerHTML = '';
    main.appendChild(weather);

}

function KtoC(K) {
    return (K - 273.15).toFixed(1); 
}

function CapFirstLetter(city) {
    var cityname = city;
    cityname = cityname.toLowerCase();
    cityname = cityname.charAt(0).toUpperCase() + cityname.slice(1);
    return cityname;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByCity(city);
    }
})