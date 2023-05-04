const router = require('express').Router()

const conversationServices = require('./conversations.services')

const passportJwt = require('../middlewares/auth.middleware')

router.route('/')
  .get(passportJwt.authenticate("jwt", { session: false }), conversationServices.getAllConversations)
  .post(passportJwt.authenticate("jwt", { session: false }), conversationServices.postConversation)

router.route('/:conversation_id')
  .get(passportJwt.authenticate('jwt', { session: false }), conversationServices.getConversationById)
  .patch(passportJwt.authenticate('jwt', { session: false }), conversationServices.patchConversation)
  .delete(passportJwt.authenticate('jwt', { session: false }), conversationServices.deleteConversation)

router.route('/:conversation_id/messages')
  .get(passportJwt.authenticate('jwt', { session: false }), conversationServices.getMessagesByConversationId)

module.exports = router