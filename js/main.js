
const searchBtn = document.getElementById('searchBtn');

// search function
function searchSort() {
    let searchBar = document.getElementById('searchBar');

    let c1 = document.getElementById('checkWeather');
    let c2 = document.getElementById('checkAttraction');

    let weather = document.querySelector('#weather');
    let attraction = document.querySelector('#attraction');

    if (searchBar.value === '') {
        alert('Gotta enter a city, mate')
    }
    if (c1.checked === true) {
        weather.style.display = 'flex';
        getWeather();
    } else {
        weather.style.display = 'none';
    }
    if (c2.checked === true) {
        attraction.style.display = 'flex';
        getAttraction();
    } else {
        attraction.style.display = 'none';
    }
    if (c1.checked === false && c2.checked === false) {
        c1.checked = true;
        c2.checked = true;
        searchSort();
    }
}

searchBtn.addEventListener('click', searchSort);

// openweather API call
async function getWeather() {
    const weatherKey = "d7bc03d1ac4e59c3ce650ed881c4a63a";
    let cityName = searchBar.value;

    // try/catch if API can't find city
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherKey}`)
        if (response.ok) {
            let json = await response.json();
            setWeather(json);
            setCity(json);
        } else {
            alert("OpenWeather couldn't find that city")
        }
    } catch (error) {
        alert("Not working properly")
    }
}

// set city name (gets name from weather API)
function setCity(json) {
    let cityTag = document.getElementById('cityTag');
    cityTag.innerHTML = json.name;
}

// set weatherbox
function setWeather(json) {
    let tempDesc = document.getElementById('tempDesc');
    let weatherDesc = document.getElementById('weatherDesc');
    let iconId = json.weather[0].icon;
    document.getElementById('wIcon').src = `http://openweathermap.org/img/w/${iconId}.png`;

    tempDesc.innerHTML = json.main.temp + " C°";
    weatherDesc.innerText = json.weather[0].description;

    let city = json.name;
    let weatherTitle = document.getElementById('weatherTitle');
    weatherTitle.innerHTML = `Weather in ${city}`;
}


// foursquare API call
async function getAttraction() {
    const clientID = "MI3WSBZXAFTJCJLIBS5LRFDSUTA5P0OV0VM3HOV5ZPV32QBA";
    const clientSecret = "0ZXVFT3FTGGSEOYDTKHYCLT4GE25GUQJTRG0BS23XILEAQKE";

    let currentDate = new Date();
    let cDay = "0" + (currentDate.getDate());
    let cMonth = "0" + (currentDate.getMonth() + 1);
    let cYear = currentDate.getFullYear();
    let date = `${cYear}${cMonth}${cDay}`;

    let city = searchBar.value;

    // try/catch if API can't find city
    try {
        let response = await fetch(`https://api.foursquare.com/v2/venues/search?near=${city}&client_id=${clientID}&client_secret=${clientSecret}&v=${date}`);
        if (response.ok) {
            let json = await response.json();
            setAttraction(json)
            setCity2(json)
        } else {
            alert("Foursquare couldn't find that city")
        }
    } catch (error) {
        console.log("Not working properly")
    }



}

// set city name (gets name from venue API)
function setCity2(json) {
    let cityTag = document.getElementById('cityTag');
    cityTag.innerHTML = json.response.geocode.feature.name;
}
// set attractionboxes, (by calling buildAttraction)
function setAttraction(json) {
    let slice = json.response.venues.slice([0], [10]);
    slice.forEach(item => {
        buildAttraction(item);
    });
}

// builds attractionbox
function buildAttraction(venue) {
    let newAttraction = document.createElement('div');
    newAttraction.className = 'result__attractions__container__item';
    let newTitle = document.createElement('h1');
    newTitle.innerHTML = venue.name;
    let container = document.querySelector('#attractionContainer');
    container.append(newAttraction);

    let newIconDiv = document.createElement('div');
    newIconDiv.className = 'result__attractions__container__item__iconDiv';
    let newIcon = document.createElement('img');
    newAttraction.append(newTitle, newIconDiv);
    newIconDiv.append(newIcon);

    let iconPrefix = venue.categories[0].icon.prefix + "88";
    let iconSuffix = venue.categories[0].icon.suffix;

    newIcon.src = `${iconPrefix}${iconSuffix}`;
}
