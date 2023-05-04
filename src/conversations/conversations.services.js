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

const getConversationById = (req, res) => {
  const id = req.params.id
  conversationControllers.findConversationById(id)
    .then((data) => {
      if(data) {
        res.status(200).json(data)
    } else {
        res.status(404).json({message: 'Conversation not found'})
    }
    })
    .catch((err) => {
      res.status(400).json({err: err.message})
    })
}

const getAllConversationsByUser = (req, res) => {
  const id = req.user.id
  conversationControllers.findAllConversationsByUser(id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json({err: err.message})
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

const patchConversation = (req, res) => {
  const id = req.params.id
  const { name, profileImage,isGroup } = req.body
  conversationControllers.updateConversation(id, {name, profileImage,isGroup})
    .then((data) => {
      if(data) {
        res.status(200).json(data)
      } else {
          res.status(404).json({message: "Conversation not found"})
      }
    })
    .catch((err) => {
      res.status(400).json({err})
    })
}

const deleteConversation = (req, res) => {
  const id = req.params.id
  conversationControllers.removeConversation(id)
    .then((data) => {
      if(!data) {
        return res.status(404).json({message: 'Invalid ID'})
      }
      res.status(204).json()
    })
    .catch((err) => {
      res.status(400).json({message: 'Bad request', err})
    })
}

module.exports = { 
  getAllConversations,
  getConversationById,
  postConversation,
  patchConversation,
  deleteConversation,
  getAllConversationsByUser
}