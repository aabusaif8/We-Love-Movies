const router = require("express").Router()
const controller = require("./movies.controller")

router.route("/")
   .get(controller.list)

router.route("/:movieId")
    .get(controller.read)

router.route("/:movieId/theaters")
    .get(controller.readTheaters)

router.route("/:movieId/reviews")
    .get(controller.readReviews)

router.route("/:movieId/critics")
    .get(controller.listCritics)

module.exports = router
