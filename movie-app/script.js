const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    showMovies(data.results);

    return data;
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class = "movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>overview</h4>
                ${overview};
            </div>
        `;

        main.appendChild(movieEl);

    });
}

function getClassByRate(rating) {
    if (rating >= 7.5 ) {
        return 'green';
    }

    else if (rating >= 5) {
        return 'orange';
    }

    else {
        return 'red';
    }
}

getMovies(APIURL);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = search.value;
    if (name) {
        getMovies(SEARCHAPI + name);
        search.value = '';
    }

})