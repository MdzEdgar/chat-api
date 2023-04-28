const router = require('express').Router()

const conversationServices = require('./conversations.services')

router.route('/')
  .get(conversationServices.getAllConversations)
  .post(conversationServices.postConversation)

module.exports = router