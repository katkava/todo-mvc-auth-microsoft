const mongoose = require('mongoose')

//Using this user model to make a user in my database, they're going to have a microsoftID and a displayName according to this schema. 
const UserSchema = new mongoose.Schema({
  microsoftId: {
    type: String,
    required: true,
  },
  //storing MicrosoftID 
  displayName: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('User', UserSchema)
