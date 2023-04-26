const Users = require('./users.models')
const Conversations = require("./conversations.models")
const Messages = require("./messages.models")
const Participants = require("./participants.models")

const initModels = () => {


   //? Users -> Participants
   Users.belongsTo(Participants)


   //? Conversations -> Participants


   //? Participants -> Messages

}

module.exports = initModels