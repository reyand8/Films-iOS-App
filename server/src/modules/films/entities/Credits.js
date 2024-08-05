const { Credit } = require('./Credit')

class Credits {
    constructor(credits) {
        this.cast = credits.cast.map((credit) => new Credit(credit))
    }
}

module.exports = {
    Credits
}