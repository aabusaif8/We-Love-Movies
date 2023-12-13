const knex = require("../db/connection");

function list() {
    return knex("movies").select("*")
}

function read(movie_id){
    return knex("movies").where({movie_id}).select("*")
}

function readTheaters(movie_id){
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "=", "movies_theaters.movie_id")
        .select("*")
        .where({movie_id})
}

function readReviews(movie_id){
    return knex("movies")
        .join("reviews","movies.movie_id", "=", "reviews.movie_id")
        .select("*")
        .where({movie_id})
}

module.exports = {
  list,
  read,
  readTheaters,
  readReviews
};