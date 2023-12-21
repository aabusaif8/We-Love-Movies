const service = require("./reviews.service")

async function update(req,res){
    const reviewId = req.params.reviewId
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: reviewId
    }
    const newReview = await service.update(updatedReview)
    res.status(200).json({data:newReview})
}

async function IdChecker(req,res,next){
    const reviewId = Number(req.params.reviewId)
    const allIds = await service.listIds()
    const idChecker = allIds.some(review => review.review_id === reviewId)
    if(idChecker){
        next()
    } else {
        res.status(404).json({error:"/cannot be found/i"})
    }
}

async function destroy(req,res){
    const reviewId = req.params.reviewId
    res.status(204).json({data: (await service.delete(reviewId))})
}

module.exports = {
    update: [IdChecker, update],
    delete: [IdChecker,destroy],
}