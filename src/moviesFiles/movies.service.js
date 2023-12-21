const knex = require("../db/connection");

function listMovieIds(){
  return knex("movies").select("movie_id")
}

async function list() {
  return knex("movies").join("movies_theaters", "movies.movie_id","=","movies_theaters.movie_id").distinct("movies.movie_id as id").select(
    "movies.title as title",
    "movies.runtime_in_minutes",
    "movies.rating",
    "movies.description",
    "movies.image_url",
    "movies_theaters.is_showing"
  )
}

function read(movie_id){
    return knex("movies").where({movie_id}).select("*")
}

function readTheaters(movie_id) {
    return knex("movies_theaters")
    .join("theaters", "movies_theaters.theater_id","=", "theaters.theater_id")
      .select("*")
      .where("movie_id", movie_id);
  }
  

  function readReviews(movie_id) {
    return knex("movies")
      .join("reviews", "movies.movie_id", "=", "reviews.movie_id")
      .join("critics", "critics.critic_id", "=", "reviews.critic_id")
      .select(
        "movies.movie_id as movieId",
        "critics.organization_name as orgName",
        "critics.preferred_name as critic_name",
        "critics.surname as surname_"
      )
      .where({ "movies.movie_id": movie_id });
  }
  

module.exports = {
  listMovieIds,
  list,
  read,
  readTheaters,
  readReviews
};