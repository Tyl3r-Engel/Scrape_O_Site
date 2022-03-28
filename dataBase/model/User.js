const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userName: String,

  password: String,

  userData: {
    type: [],
    required: true
  }
})

module.exports =  mongoose.model('users', UserSchema)