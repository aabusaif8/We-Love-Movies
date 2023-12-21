const service = require("./theaters.service")
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties");


async function list(req,res,next) {
  const movies = await service.list()
  const reduceTheaterAndMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies",null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies",null,"description"],
    image_url: ["movies", null, "image_url"],
    created_at:["movies",null,"created_at"],
    updated_at: ["movies",null,"updated_at"],
    is_showing: ["movies",null,"is_showing"],
    theater_id: ["movies",null,"theater_id"]
  });
  const updatedMovies = reduceTheaterAndMovies(movies)

  res.status(200).json({data:updatedMovies})
}

module.exports = {
    list
}