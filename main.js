const api = {
    key: "6e1e02feeefbbff93035f4b6462e583f",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    getResults(searchbox.value);
    console.log(searchbox.value);
})

async function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('nooo');
        })
        .then(displayResults)
        .catch((e) => {
            document.getElementById('form').reset()
            document.getElementById('input').setAttribute('placeholder', 'City not found');
        })
    }

function displayResults(weather) {

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    let date = document.querySelector('.location .date');
    date.innerText = buildDate(now);

    let temp = document.querySelector('.current .temp');
    temp.firstChild.nodeValue = `${Math.round(weather.main.temp)}`;
    
    let weather_main = document.querySelector('.current .weather');
    weather_main.innerText = `${weather.weather[0].main}`;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function buildDate(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}