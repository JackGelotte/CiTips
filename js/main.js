console.log('Hello World!');

function search() {
    let searchBar = document.getElementById('searchBar');
    let searchString = searchBar.value;
    alert(searchString);
}

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', search);