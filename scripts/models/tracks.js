var restful = require('node-restful');
var mongoose = restful.mongoose;

var trackSchema = new mongoose.Schema({
  itemId: {type: Number, default: 0},
  itemName: String,
  itemCategory: String,
  price: {type: Number, default: 0},
  quantity: {type: Number, default: 0},
  ownerName: String,
  ownerGamerCode: String,
  isTSR: {type: Number, default: 0 }, //0:tsr, 1: real
  someId: mongoose.Schema.Types.ObjectId,
  createdAt: String,
});


module.exports = restful.model('Tracks', trackSchema);
