// models/Online.js
const mongoose = require('mongoose');

const onlineSchema = new mongoose.Schema({
  name: String,
  description: String,
  // Add other fields as necessary
});

const Online = mongoose.model('Online', onlineSchema);

module.exports = Online;