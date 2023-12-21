const { all } = require("./movies.router")
const service = require("./movies.service")

async function IdChecker(req,res,next){
    const movieId = Number(req.params.movieId)
    const allMovieIds = await service.listMovieIds()
    const checker = allMovieIds.some(movie => movie.movie_id === movieId)
    if(checker){
        next()
    }else{
        res.status(404).json({error:"/cannot be found/i"})
    }
}

async function list(req,res,next){
    const isShowing = req.query.is_showing
    const allMovies = await service.list()
    if(isShowing === 1){
        return res.status(200).json({data:allMovies})
    }else{
        const showing = allMovies.filter((movie) => movie.is_showing)
        return res.status(200).json({data:showing})
    }
}

async function read(req,res,next){
    const movieId = req.params.movieId
    return res.status(200).json({data:(await service.read(movieId).then((rows) => rows[0]))})
}

async function readTheaters(req,res,next){
    const movieId = req.params.movieId

    const theaters = await service.readTheaters(movieId)

    const showingTheaters = theaters.map(theater => theater.name)
  
    return res.status(200).json({data:theaters})
}

async function readReviews(req,res,next){
    const movieId = req.params.movieId
    const reviews = await service.readReviews(movieId)
    const critics = reviews.map(review => ({
        movie_id:review.movieId,
        critic:{
            organization_name: review.orgName ,
            preferred_name: review.critic_name,
            surname: review.surname_
        }
    }))
    return res.status(200).json({data:critics })
}

async function listCritics(req,res,next){
    res.status(404).json({error:"method not allowed"})
}

module.exports = {
    list,
    read: [IdChecker, read],
    readTheaters,
    readReviews,
    listCritics,
}