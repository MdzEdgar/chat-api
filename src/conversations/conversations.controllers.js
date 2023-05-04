const uuid = require('uuid')
const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

const findAllConversations = async () => {
  const conversations = await Conversations.findAll()
  return conversations
}

const findConversationById = async (id) => {
  const data = await Conversations.findOne({
    where: {
      id: id
    }
  })
  return data
}

const findAllConversationsByUser = async (id) => {
  const data = await Conversations.findAll({
    include: {
      model: Participants,
      where: {
        userId: id,
      }
    }
  })
  return data
}

const createConversation = async(conversationObj) => {

  //? Validacion por si el usuario invitado existe
  const userGuest = await Users.findOne({where: {id: conversationObj.guestId}})

  if(!userGuest){
      return false
  } 

  const newConversation = await Conversations.create({
      id: uuid.v4(),
      name: conversationObj.name,
      profileImage: conversationObj.profileImage,
      isGroup: conversationObj.isGroup
  })

  //? Owner participant
  await Participants.create({
      id: uuid.v4(),
      userId: conversationObj.ownerId,
      conversationId: newConversation.id,
      isAdmin: true
  })

  //? Guest participant
  await Participants.create({
      id: uuid.v4(),
      userId: conversationObj.guestId,
      conversationId: newConversation.id,
      isAdmin: false
  })

  return newConversation
}

const updateConversation = async(id, conversationObj) => {
  const selectedConversation = await Conversations.findOne({
    where: {
      id: id
    }
  })

  if (!selectedConversation) return null

  const modifiedConversation = await selectedConversation.update(conversationObj)
  return modifiedConversation
}

const removeConversation = async(id) => {
  const conversation = await Conversations.destroy({
    where: {
      id: id
    }
  })
  return conversation
}

module.exports = {
  findAllConversations,
  findConversationById,
  findAllConversationsByUser,
  createConversation,
  updateConversation,
  removeConversation
}