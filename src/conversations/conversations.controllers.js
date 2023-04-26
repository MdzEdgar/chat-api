const uuid = require('uuid')
const Conversations = require('../models/conversations.models')

const findAllConversations = async () => {
  const conversations = await Conversations.findAll({})
}

const findConversationById = async () => {

}

const createConversation = async () => {
  
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