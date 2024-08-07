const { IMAGE_PATH_342 } = require('../../../config');

class Person {
    constructor(person) {
        this.person = person;
        this.adult = person.adult;
        this.id = person.id;
        this.biography = person.biography;
        this.birthday = person.birthday;
        this.deathday = person.deathday;
        this.name = person.name;
        this.popularity = person.popularity;
        this.profilePath = `${IMAGE_PATH_342}${person.profile_path}`;
        this.placeOfBirth = person.place_of_birth;
        this.imdbId = person.imdb_id;
    }
}

module.exports = {
    Person
}