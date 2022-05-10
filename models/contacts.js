const mongoose = require('../mongoconnect');
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Contact', contactSchema)