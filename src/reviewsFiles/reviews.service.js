const knex = require("../db/connection");

function listIds(){
  return knex("reviews").select("review_id")
}

function destroy(review_id) {
  return knex("reviews").select("review_id").where({review_id}).del()
}

async function update(newReview){
  const { review_id, content, score, critic_id, movie_id, critic } = newReview
  await knex("reviews").where({review_id}).update(
      {
        review_id: newReview.review_id,
        content:newReview.content,
        score:newReview.score,
        critic_id: newReview.critic_id,
        movie_id: newReview.movie_id,
      }
    )

  const updatedReview = await knex("reviews").join("critics", "reviews.critic_id","=","critics.critic_id").where({"reviews.review_id":newReview.review_id}).select(
      "reviews.review_id",
      "reviews.content",
      "reviews.score",
      "reviews.created_at",
      "reviews.updated_at",
      "reviews.critic_id",
      "reviews.movie_id",
      "critics.critic_id",
      "critics.preferred_name",
      "critics.surname",
      "critics.organization_name",
      "critics.created_at",
      "critics.updated_at"
  ).first()

if(updatedReview){
  const response = {
  review_id: updatedReview.review_id,
  content: updatedReview.content,
  score: updatedReview.score,
  created_at: updatedReview.created_at,
  updated_at: updatedReview.updated_at,
  critic_id: updatedReview.critic_id,
  movie_id: updatedReview.movie_id,
  critic: {
    critic_id: updatedReview.critic_id,
    preferred_name: updatedReview.preferred_name,
    surname: updatedReview.surname,
    organization_name: updatedReview.organization_name,
    created_at: updatedReview.critic_created_at,
    updated_at: updatedReview.critic_updated_at,
  }
}
return response
}else{
  return null
}

}

module.exports = {
  listIds,
  delete: destroy,
  update
};