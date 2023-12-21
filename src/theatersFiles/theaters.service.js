const knex = require("../db/connection");

async function list() {
  const info = await knex("movies").distinct("theaters.theater_id").join("movies_theaters", "movies.movie_id", "=", "movies_theaters.movie_id")
  .join("theaters","movies_theaters.theater_id", "=", "theaters.theater_id").select(
    "theaters.theater_id as theater_id",
    "theaters.name as name",
    "theaters.address_line_1 as address_line_1",
    "theaters.address_line_2 as address_line_2",
    "theaters.city as city",
    "theaters.state as state",
    "theaters.zip as zip",
    "theaters.created_at as created_at",
    "theaters.updated_at as updated_at",
    "movies.movie_id as movie_id",
    "movies.title as title",
    "movies.runtime_in_minutes as runtime_in_minutes",
    "movies.rating as rating",
    "movies.description as description",
    "movies.image_url as image_url",
    "movies.created_at as created_at",
    "movies.updated_at as updated_at",
    "movies_theaters.is_showing as is_showing",
    "movies_theaters.theater_id as movies_theater_id"
  )
  // const response = info.map((movie) =>({
  //   theater_id : movie.theater_id ,
  //   name : movie.name,
  //   address_line_1 : movie.address_line_1,
  //   address_line_2 : movie.address_line_2,
  //   city : movie.city ,
  //   state :movie.state ,
  //   zip : movie.zip,
  //   created_at : movie.created_at,
  //   updated_at : movie.updated_at,
  //   movies : 
  //   {
  //      movie_id: movie.movie_id,
  //      title: movie.title,
  //      runtime_in_minutes: movie.runtime_in_minutes ,
  //      rating: movie.rating,
  //      description: movie.description,
  //      image_url: movie.image_url,
  //      created_at: movie.created_at,
  //      updated_at: movie.updated_at,
  //      is_showing: movie.is_showing,
  //      theater_id: .movies_theater_id
  //     },
  // }))

      return info
  }
module.exports = {
  list,
}
