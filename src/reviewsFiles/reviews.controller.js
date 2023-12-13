const service = require("./reviews.service")

async function update(reviewId){
    const reviewId = req.params.review_id
    const updatedReview = {
        ...Response.locals.review,
        ...request.body.data,
        review_id: response.locals.review.review_id
    }
    const newReview = await service.update(updatedReview)
    res.status(200).json({data:newReview})
}

async function destroy(reviewId){
    const reviewId = req.params.review_id
    res.status(204).json({data: (await service.delete(review))})
}

module.exports = {
    update,
    delete: destroy,
}