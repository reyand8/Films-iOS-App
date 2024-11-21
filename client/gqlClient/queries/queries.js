import { gql } from '@apollo/client';


export const FILMS_BY_RATING = gql`
    query Films {
        filmsByRating {
            page
            totalResults
            totalPages
            results {
                id
                title
                adult
                voteAverage
                image: posterPath
                releaseDate(format: "MMMM yyyy")
            }
        }
    }
`;

export const FILMS_BY_UPCOMING = gql`
    query Films {
        filmsByUpcoming {
            page
            totalResults
            totalPages
            results {
                id
                title
                adult
                voteAverage
                image: posterPath
                releaseDate(format: "MMMM yyyy")
            }
        }
    }
`;

export const FILMS_BY_TRENDING = gql`
    query Films {
        filmsByTrending {
            page
            totalResults
            totalPages
            results {
                id
                title
                adult
                voteAverage
                image: posterPath
                releaseDate(format: "MMMM yyyy")
            }
        }
    }
`;

export const SIMILAR_FILMS = gql`
    query Films($id: Int) {
        filmsSimilar(id: $id) {
            results {
                id
                title
                adult
                voteAverage
                runtime
                genres {
                    id
                    name
                }
                image: posterPath
                releaseDate(format: "MMMM yyyy")
            }
        }
    }
`;

export const FILM_BY_CREDITS = gql`
    query Credits($ids: [Int]) {
        filmCredits(ids: $ids) {
            cast {
                id
                gender
                adult
                name
                originalName
                popularity
                profilePath
                creditId
            }
        }
    }
`;

export const FILMS_BY_ID_QUERY = gql`
    query FilmsById($ids: [Int]) {
        filmsById(ids: $ids) {
            id
            title
            adult
            voteAverage
            runtime
            genres {
                id
                name
            }
            image: posterPath
            releaseDate(format: "dd.MM.yyyy")
        }
    }
`;

export const FILMS_BY_SEARCH_QUERY = gql`
    query Films($search: FilmsSearchInput) {
        filmsBySearchQuery(search: $search) {
            page
            totalResults
            totalPages
            results {
                id
                title
                adult
                voteAverage
                image: posterPath
                releaseDate(format: "MMMM yyyy")
            }
        }
    }
`;

export const PERSON_DETAILS = gql`
    query Person($id: Int) {
        personDetails(id: $id) {
            id
            adult
            biography
            birthday
            deathday
            name
            popularity
            profilePath
            placeOfBirth
            imdbId
        }
    }
`;

export const PERSON_FILMS_CREDITS = gql`
    query PersonFilmCredits($id: Int) {
        personFilms(id: $id) {
            cast {
                id
                backdropPath
                adult
                originalLanguage
                originalTitle
                overview
                popularity
                posterPath
                releaseDate
                title
            }
        }
    }
`;