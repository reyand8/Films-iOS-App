const { getDetails, getTopRatedFilms,
    getUpcomingFilms, getTrendingFilms, getCredits, getSimilar, getFilmsBySearchQuery, getPersonDetails, getPersonFilms
} = require('../modules/films');
const {Film} = require("../modules/films/entities/Film");


async function filmsByRating() {
    return await getTopRatedFilms();
}

async function filmsByUpcoming() {
    return await getUpcomingFilms();
}

async function filmsByTrending() {
    return await getTrendingFilms();
}

async function filmsById(parent, {ids}) {
    const requests = ids.map((id) => getDetails(id))
    const data = await Promise.all(requests)
    return data.map(({data}) => new Film(data))
}

async function filmCredits(parent, {ids}) {
    return await getCredits(ids)
}

async function filmsSimilar(parent, id) {
    return await getSimilar(id);
}

async function filmsBySearchQuery(parent, args) {
    return await getFilmsBySearchQuery(args.search);
}

async function personDetails(parent, {id}) {
    return await getPersonDetails(id);
}

async function personFilms(parent, {id}) {
    return await getPersonFilms(id);
}

module.exports = {
    filmsByTrending,
    filmsByUpcoming,
    filmsByRating,
    filmsById,
    filmCredits,
    filmsSimilar,
    filmsBySearchQuery,
    personDetails,
    personFilms,
}