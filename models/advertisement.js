const mongoose = require('mongoose')

const advertisementSchema = new mongoose.Schema({
    shortText: { type: String, unique: true, required: true },
    description: { type: String },
    images: { type: String },
    userId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    tags: { type: String },
    isDeleted: { type: Boolean, required: true },
})

const advertisement = mongoose.model('User', advertisementSchema)

module.exports = advertisement
