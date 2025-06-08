const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  user: { type: String, required: true },
  type: { type: String, enum: ['give', 'want'], required: true },
  name: { type: String, required: true },
  category: { type: String },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
