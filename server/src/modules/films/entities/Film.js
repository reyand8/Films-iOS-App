const { format } = require('date-fns')

const { IMAGE_PATH_342 } = require('../../../config');
const {enUS} = require("date-fns/locale");

class Film {
    constructor(film) {
        this.film = film;
        this.id = film.id;
        this.title = film.title;
        this.posterPath = `${IMAGE_PATH_342}${film.poster_path}`;
        this.adult = film.adult;
        this.overview = film.overview;
        this.originalLanguage = film.original_language;
        this.backdropPath = `${IMAGE_PATH_342}${film.backdrop_path}`;
        this.popularity = film.popularity;
        this.voteCount = film.vote_count;
        this.video = film.video;
        this.voteAverage = film.vote_average;
        this.language = film.language;
        this.runtime = film.runtime;
        this.production = film.production_countries;
        this.genres = film.genres;
    }
    releaseDate(params) {
        try {
            const date = params.format
                ? format(new Date(this.film.release_date), params.format, { locale: enUS })
                : this.film.release_date;
            return date
        } catch (e) {
            console.error(e);
            return this.film.release_date;
        }
    }
}

module.exports = {
    Film
}