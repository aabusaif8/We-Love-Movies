const { all } = require("./movies.router")
const service = require("./movies.service")

async function list(req,res,next){
    const param = req.params.is_showing
    if(param == true){
        const allMovies = await service.list()
        allMovies.filter(movie => movie.is_showing === true)
        return res.status(200).json({data:allMovies})
    }else{
        return res.status(200).json({data:(await service.list())})
    }
}

async function read(req,res,next){
    const movieId = req.params.movieId
    return res.status(200).json({data:(await service.read(movieId))})
}

async function readTheaters(req,res,next){
    const movieId = req.params.movieId
    return res.status(200).json({data:(await service.readTheaters(movieId))})
}

async function readReviews(req,res,next){
    const movieId = req.params.movieId
    return res.status(200).json({data:(await service.readReviews(movieId))})
}

module.exports = {
    list,
    read,
    readTheaters,
    readReviews
}