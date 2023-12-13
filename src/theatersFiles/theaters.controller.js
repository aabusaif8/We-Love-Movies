const service = require("./theaters.service")
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties");


async function list(req,res,next){
    const allData = await service.list()
    const reducedMovies = allData.reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        rating: ["movies", null, "rating"],
      })
    const mappedMovies = reducedMovies.mapProperties({
        movie_id: "movies[0].movie_id",
        title: "movies[0].title",
        rating: "movies[0].rating",
      })
    res.status(200).json({data:mappedMovies})
}

module.exports = {
    list
}