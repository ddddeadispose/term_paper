const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    contactPhone: { type: String },
})

const User = mongoose.model('User', userSchema)

module.exports = User
