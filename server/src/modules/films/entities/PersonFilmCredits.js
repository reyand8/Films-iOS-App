const { IMAGE_PATH_342 } = require('../../../config');

class PersonFilmCredits {
    constructor(person) {
        this.person = person;
        this.adult = person.adult;
        this.backdropPath = person.backdrop_path;
        this.id = person.id;
        this.originalLanguage = person.original_language;
        this.originalTitle = person.original_title;
        this.overview = person.overview;
        this.popularity = person.popularity;
        this.posterPath = `${IMAGE_PATH_342}${person.poster_path}`;
        this.releaseDate = person.release_date;
        this.title = person.title;
    }
}

module.exports = {
    PersonFilmCredits
}