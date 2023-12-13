const router = require("express").Router({mergeParams:true})
const controller = require("./movies.controller")

router.route("/movies")
    .get(controller.list)
    .get(controller.read)

router.route("/movies/:movieId")
    .get(controller.read)

router.route("/movies/:movieId/theaters")
    .get(controller.readTheaters)

router.route("/movies/:movieId/reviews")
    .get(controller.readReviews)

module.exports = {
    router
}