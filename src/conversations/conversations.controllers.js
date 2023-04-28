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

const createConversation  = async (conversationObj, userOwnerId, userGuestId) => {
  const userGuest = await Users.findOne({where: {id: userGuestId}})

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
      userId: userOwnerId,
      conversationId: newConversation.id,
      isAdmin: true
  })

  //? Guest participant
  await Participants.create({
      id: uuid.v4(),
      userId: userGuestId,
      conversationId: newConversation.id,
      isAdmin: false
  })

  return newConversation
}

const updateConversation = async () => {

}

const deleteConversation = async () => {

}

module.exports = {
  findAllConversations,
  findConversationById,
  createConversation,
  updateConversation,
  deleteConversation
}