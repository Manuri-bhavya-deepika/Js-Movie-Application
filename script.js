const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + apiKey + '&page=1';
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=';

const moviesContainer = document.querySelector('.movies');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');

// Fetch movies from API
function fetchMovies(url) {
	fetch(url)
		.then(response => response.json())
		.then(data => {
			displayMovies(data.results);
		})
		.catch(error => console.log(error));
}

// Display movies on page
function displayMovies(movies) {
	moviesContainer.innerHTML = '';

	movies.forEach(movie => {
		const movieElement = document.createElement('div');
		movieElement.classList.add('movie');

		const movieImg = document.createElement('img');
		movieImg.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
		movieImg.alt = movie.title;
		movieImg.addEventListener('mouseover', () => {
			const movieOverview = document.createElement('div');
			movieOverview.classList.add('movie-overview');
			movieOverview.innerHTML = `
				<h2>${movie.title}</h2>
				<p>${movie.overview}</p>
				<p>Rating: ${movie.vote_average}</p>
			`;
			movieElement.appendChild(movieOverview);
		});
		movieImg.addEventListener('mouseout', () => {
			const movieOverview = movieElement.querySelector('.movie-overview');
			movieElement.removeChild(movieOverview);
		});

		movieElement.appendChild(movieImg);
		moviesContainer.appendChild(movieElement);
	});
}

// Load popular movies on page load
window.addEventListener('load', () => {
	fetchMovies(apiUrl);
});

// Search movies on button click
searchBtn.addEventListener('click', () => {
	const searchTerm = searchInput.value;
	if (searchTerm) {
		fetchMovies(searchUrl + searchTerm);
	}
});
