var restful = require('node-restful');
var mongoose = restful.mongoose;


var itemSchema = new mongoose.Schema({
  itemId: {type: Number, default: 0},
  itemName: String,
  itemCategory: String,
  price: {type: Number, default: 0},
  quantity: {type: Number, default: 0},
  stock: {type: Number, default: 0},
  someId: mongoose.Schema.Types.ObjectId,
  createdAt: String,
});

module.exports = restful.model('Items',itemSchema);
