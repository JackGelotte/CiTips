
const searchBtn = document.getElementById('searchBtn');


function searchSort() {
    let searchBar = document.getElementById('searchBar');
    let searchString = searchBar.value;
    
    console.log(searchString);

    let c1 = document.getElementById('checkWeather');
    let c2 = document.getElementById('checkAttraction');

    let weather = document.querySelector('#weather');
    let attraction = document.querySelector('#attraction');

    if (c1.checked === true) {
       weather.style.display = 'flex';
    } else {
        weather.style.display = 'none';
    }
    if (c2.checked === true) {
        attraction.style.display = 'flex';
    } else {
        attraction.style.display = 'none';
    }

}

async function getWeather(){
    const weatherKey = "d7bc03d1ac4e59c3ce650ed881c4a63a";
    let cityName = searchBar.value;

    let response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherKey}`)
    let json = await response.json()
    console.log(json)
    setWeather(json)
}

function setWeather(json){
    let temp = document.getElementById('temp');
    let rainEtc = document.getElementById('rainEtc');
    let wind = document.getElementById('wind');
    temp.innerHTML = json.main.temp;
    rainEtc.innerHTML = json.weather[0].description;
    wind.innerHTML = json.wind.speed;
}

// foursquare


async function getAttraction(){
    const clientID = "MI3WSBZXAFTJCJLIBS5LRFDSUTA5P0OV0VM3HOV5ZPV32QBA";
    const clientSecret = "0ZXVFT3FTGGSEOYDTKHYCLT4GE25GUQJTRG0BS23XILEAQKE";

    let currentDate = new Date();
    let cDay = "0" + (currentDate.getDate());
    let cMonth = "0" + (currentDate.getMonth() + 1);
    let cYear = currentDate.getFullYear();
    let date = `${cYear}${cMonth}${cDay}`;
    
    let city = searchBar.value;

    let response = await fetch (`https://api.foursquare.com/v2/venues/search?near=${city}&client_id=${clientID}&client_secret=${clientSecret}&v=${date}`);
    let json = await response.json();
    console.log(json)
    console.log(json.response.venues[0].name);
    setAttraction(json)
}

function setAttraction(json){
    let attraction = document.querySelector('#attraction');
    let slice = json.response.venues.slice([0], [10]);
    slice.forEach(item => {
        console.log(item.name);
    });
    
}


searchBtn.addEventListener('click', searchSort);
searchBtn.addEventListener('click', getWeather);
searchBtn.addEventListener('click', getAttraction);