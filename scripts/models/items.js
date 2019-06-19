var restful = require('node-restful');
var mongoose = restful.mongoose;


var itemSchema = new mongoose.Schema({
  itemName: String,
  itemCategory: String,
  price: {type: Number, default: 0},
  totalQuantity: {type: Number, default: 0},
  buyableQuantity: {type: Number, default: 0},
  someId: mongoose.Schema.Types.ObjectId,
});


module.exports = restful.model('Items',itemSchema);
