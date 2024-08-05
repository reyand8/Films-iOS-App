const { IMAGE_PATH_342 } = require('../../../config');

class Credit {
    constructor(credit) {
        this.credit = credit;
        this.id = credit.id;
        this.gender = credit.gender;
        this.adult = credit.adult;
        this.name = credit.name;
        this.originalName = credit.original_name;
        this.popularity = credit.popularity;
        this.profilePath = `${IMAGE_PATH_342}${credit.profile_path}`;
        this.creditId = credit.credit_id;
    }
}

module.exports = {
    Credit
}