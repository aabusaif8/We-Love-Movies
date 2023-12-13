const knex = require("../db/connection");

function destroy(reviewId) {
  return knex("reviews").where({reviewId}).del()
}

async function update(reviewId, {score,content}){
    await knex("reviews").where({reviewId}).update(score, content)
    
    return await knex("reviews").where({reviewId}).select(
    'reviews.reviewId',
    'reviews.content',
    'reviews.score',
    'reviews.created_at',
    'reviews.updated_at',
    'reviews.critic_id',
    'reviews.movie_id',
    'critics.critic_id as critic.critic_id',
    'critics.preferred_name as critic.preferred_name',
    'critics.surname as critic.surname',
    'critics.organization_name as critic.organization_name',
    'critics.created_at as critic.created_at',
    'critics.updated_at as critic.updated_at'
    )
    .join("critics", "reviews.critic_id", "=", "critics.critic_id")
}

module.exports = {
  delete: destroy,
  update
};