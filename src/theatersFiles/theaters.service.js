const knex = require("../db/connection");

function list() {
  return knex("theaters").select("*")
    .join("movies_theaters", "theaters.movie_id", "=", "movies_theaters.movie_id")
    .select("*")
    .where({movie_id})
}

module.exports = {
  list,
};