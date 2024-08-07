const { PersonFilmCredits } = require('./PersonFilmCredits')

class PersonFilms {
    constructor(credits) {
        this.cast = credits.cast.map((credit) => new PersonFilmCredits(credit))
    }
}

module.exports = {
    PersonFilms
}