if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const moviesRouter = require("./moviesFiles/movies.router")
const theatersRouter = require("./theatersFiles/theaters.router")
const reviewsRouter = require("./reviewsFiles/reviews.router")

app.use(cors())
app.use(express.json())
app.use("/movies", moviesRouter)

app.use("/theaters", theatersRouter)

app.use("/reviews", reviewsRouter)


module.exports = app;
