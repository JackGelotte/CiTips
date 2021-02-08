
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

async function getWeather (){
    let weatherKey = "d7bc03d1ac4e59c3ce650ed881c4a63a";
    let cityName = searchBar.value;

    let response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}`)
    let json = await response.json()
    console.log(json)
    setWeather(json)

}

function setWeather(){
    let weatherBox = document.querySelector('#weather');
    weatherBox.innerHTML = '';
    let newWeather = document.createElement('div');
    newWeather.className =  'result__weather__item';
    weatherBox.append(newWeather);
    let weatherTitle = document.createElement('h1');
    weatherTitle.innerText = 'Weather';
    newWeather.append(weatherTitle);
    

}

// foursquare
const clientID = "MI3WSBZXAFTJCJLIBS5LRFDSUTA5P0OV0VM3HOV5ZPV32QBA";
const clientSecret = "0ZXVFT3FTGGSEOYDTKHYCLT4GE25GUQJTRG0BS23XILEAQKE";





searchBtn.addEventListener('click', searchSort);
//searchBtn.addEventListener('click', weatherSearch);
searchBtn.addEventListener('click', getWeather);