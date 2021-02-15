
const searchBtn = document.getElementById('searchBtn');

// sök funktion - kör API request och visar resultat beroende på vad som är "checked"
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

// funktion för API call till OpenWeather
async function getWeather() {
    const weatherKey = "d7bc03d1ac4e59c3ce650ed881c4a63a";
    // sökordet
    let cityName = searchBar.value;

    // try/catch för API call
    try {
        // här kör vi en fetch, med min OpenWeather URL
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherKey}`)
        if (response.ok) {
            // om den är ok så visar vi vädret med setWeather
            let json = await response.json();
            setWeather(json);
            setCity(json);
        } else {
            // error om den inte är ok
            alert("OpenWeather couldn't find that city")
            let weather = document.querySelector('#weather');
            weather.style.display = 'none';
        }
    } catch (error) {
        alert("Weather API not working properly")
    }
}

// h1 högst upp i resultat container,  från namnet på platsen som OpenWeather gett oss
function setCity(json) {
    let cityTag = document.getElementById('cityTag');
    cityTag.innerHTML = json.name;
}

// funktion för att visa det temperatur och väder, från det vi får från OpenWeather
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


// funktion för API call till FourSquare
async function getAttraction() {
    const clientID = "MI3WSBZXAFTJCJLIBS5LRFDSUTA5P0OV0VM3HOV5ZPV32QBA";
    const clientSecret = "0ZXVFT3FTGGSEOYDTKHYCLT4GE25GUQJTRG0BS23XILEAQKE";

    // detta fixar dagens datum för URL
    let currentDate = new Date();
    let cDay = "0" + (currentDate.getDate());
    let cMonth = "0" + (currentDate.getMonth() + 1);
    let cYear = currentDate.getFullYear();
    let date = `${cYear}${cMonth}${cDay}`;
    // sökordet
    let city = searchBar.value;

    // try/catch för API call
    try {
        // här kör vi en fetch, med min FourSquare URL
        let response = await fetch(`https://api.foursquare.com/v2/venues/search?near=${city}&client_id=${clientID}&client_secret=${clientSecret}&v=${date}`);
        if (response.ok) {
            let json = await response.json();
            setAttraction(json)
            setCity2(json)
        } else {
            alert("Foursquare couldn't find that city")
        }
    } catch (error) {
        console.log("Attraction API not working properly")
    }



}

// h1 högst upp i resultat container,  från namnet på platsen som FourSquare gett oss
function setCity2(json) {
    let cityTag = document.getElementById('cityTag');
    cityTag.innerHTML = json.response.geocode.feature.name;
}
// funtion för att visa venues, i den stad vi får av FourSquare
function setAttraction(json) {
    // tömmer containern innan den ska skapa nytt
    clear();
    // tar en slice av den respons vi fått
    let slice = json.response.venues.slice([0], [10]);

    let c3 = document.querySelector('#checkAlpha');
    // sorterar om det är icheckat att sortera i alfabetisk ordning. Kollar först namn på stället, och om det skulle finnas fler så kör den efter kategori.
    if (c3.checked) {
        slice.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            else if (a.name < b.name) {
                return -1;
            } else {
                if (a.categories[0].name > b.categories[0].name) {
                    return 1;
                }
                if (a.categories[0].name < b.categories[0].name) {
                    return -1;
                }
            }
            return 0;
        })
    }
    // kallar på buildAttraction för varje item i slice
    slice.forEach(item => {
        buildAttraction(item);
    });
}

// funktion som bygger varje venue i vår slice
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

// funktionen som rensar venue resultat innan det fylls på nytt
function clear() {
    Array.from(document.querySelector('#attractionContainer').childNodes).forEach(e => e.remove());
}