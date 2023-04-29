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
  const conversationObj = req.body
  const ownerId = req.user.id 
  conversationControllers.createConversation({...conversationObj, ownerId})
      .then(data => {
          if(!data) {
              return res.status(404).json({message: 'Guest ID not exists'})
          }
          res.status(201).json(data)
      })
      .catch(err => {
          res.status(400).json({err: err.message})
      })
}

module.exports = { 
  getAllConversations,
  postConversation
}