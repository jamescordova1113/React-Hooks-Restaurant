const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  startDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  endDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  comment: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;