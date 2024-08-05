const { Film } = require('./Film')

class Films {
    constructor(films) {
        this.page = films.page;
        this.totalResults = films.total_results;
        this.totalPages = films.total_pages;
        this.results = films.results.map((film) => new Film(film))
    }
}

module.exports = {
    Films
}