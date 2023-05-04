const router = require('express').Router()

const conversationServices = require('./conversations.services')

router.route('/')
  .get(passportJwt.authenticate("jwt", { session: false }), conversationServices.getAllConversations)
  .post(passportJwt.authenticate("jwt", { session: false }), conversationServices.postConversation)

module.exports = router