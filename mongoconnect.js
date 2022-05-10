const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contacts', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;