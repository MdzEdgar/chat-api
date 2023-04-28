const conversationControllers = require('./conversations.controllers')

const getAllConversations =(req, res) => {
  conversationControllers.findAllConversations()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json({message: 'Bad request', err})
    })
}

const postConversation = (req, res) => {
  const ownerId = req.user.id
  const { guestId, ...conversationObj } = req.body
  conversationControllers.createConversation(conversationObj, ownerId, guestId)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json({message: 'Bad request', err: err.message})
    })
}

module.exports = { 
  getAllConversations,
  postConversation
}