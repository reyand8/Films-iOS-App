const axios = require('axios');

const { Films } = require('./entities/Films');
const { API_KEY, API_BASE_URL } = require('../../config');
const {Credits} = require("./entities/Credits");


const getTopRatedFilms = async () => {
    const result = await axios.get(
        `${API_BASE_URL}movie/top_rated?api_key=${API_KEY}`);
    return new Films(result.data);
}

const getUpcomingFilms = async () => {
    const result = await axios.get(
        `${API_BASE_URL}movie/upcoming?api_key=${API_KEY}`);
    return new Films(result.data);
}

const getTrendingFilms = async () => {
    const result = await axios.get(
        `${API_BASE_URL}trending/movie/day?api_key=${API_KEY}`);
    return new Films(result.data);
}

const getDetails = async (id) => {
    return await axios.get(
        `${API_BASE_URL}movie/${id}?api_key=${API_KEY}`
    );
}

const getCredits = async (ids) => {
    const id = ids[0]
    const result = await axios.get(
        `${API_BASE_URL}movie/${id}/credits?api_key=${API_KEY}`
    );
    return new Credits(result.data);
}

const getSimilar = async (id) => {
    const result = await axios.get(
        `${API_BASE_URL}movie/${id.id}/similar?api_key=${API_KEY}`
    );
    return new Films(result.data);
}

const getFilmsBySearchQuery = async (search) => {
    const result = await axios.get(`${API_BASE_URL}search/movie?api_key=${API_KEY}&language=${search.language}&query=${search.query}&page=${search.page}`);
    return new Films(result.data);
}

module.exports = {
    getTopRatedFilms,
    getUpcomingFilms,
    getTrendingFilms,
    getDetails,
    getCredits,
    getSimilar,
    getFilmsBySearchQuery,
}