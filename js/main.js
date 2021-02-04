
const searchBtn = document.getElementById('searchBtn');

function search() {
    let searchBar = document.getElementById('searchBar');
    let searchString = searchBar.value;
    console.log(searchString);

    let c1 = document.getElementById('checkWeather');
    let c2 = document.getElementById('checkAttraction');
    let c3 = document.getElementById('checkAlpha');

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
searchBtn.addEventListener('click', search);