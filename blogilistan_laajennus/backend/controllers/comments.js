const router = require('express').Router()

const Comment = require('../models/comment')

router.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('blog')
  response.json(comments)
})

module.exports = router
