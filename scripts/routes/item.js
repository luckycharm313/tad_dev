var common = require('./common');
var mongoose = require('mongoose');

var itemSchema = require('../models/items').itemSchema;
var trackSchema = require('../models/tracks').trackSchema;

exports.post =  function(req, res) {
    var Item = mongoose.model("Items", itemSchema);
    
    if (req.body.itemName == undefined) {
        return common.send(res, 401, '', 'itemName is undefined');
    }

    if (req.body.itemCategory == undefined) {
        return common.send(res, 401, '', 'itemCategory is undefined');
    }

    if (req.body.price == undefined) {
        return common.send(res, 401, '', 'price is undefined');
    }

    if (req.body.quantity == undefined) {
        return common.send(res, 401, '', 'quantity is undefined');
    }
    
    if (req.body.id == undefined) {
        return common.send(res, 401, '', 'item id is undefined');
    }

    Item.findOne({itemId : req.body.id}).exec(function(err, data){
        if(err){
            return common.send(res, 400, '', err);
        }
        else{
            if (data == undefined || data == null) {
                var createAt = Math.round(new Date().getTime()/1000);
                
                var newItem = new Item({
                    itemId: req.body.id,
                    itemName: req.body.itemName,
                    itemCategory: req.body.itemCategory,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    stock: req.body.quantity,
                    createdAt: createAt
                });
            
                newItem.save(function(err, result){
                    if(err){
                        return common.send(res, 400, '', err);
                    }
                    else{
                        return common.send(res, 200, '', 'success');
                    }
                });
            }
            else{
                data.price = req.body.price;
                data.quantity = req.body.quantity;
                data.stock = req.body.quantity;

                data.save(function(err, result){
                    if(err){
                        return common.send(res, 400, '', err);
                    }
                    else{
                        return common.send(res, 200, '', 'success');
                    }
                });
            }
        }
    }); 
};

exports.get =  function(req, res) {
    var Item = mongoose.model("Items", itemSchema);
    Item.find({}).sort({'itemCategory': 1}).exec(function(err, data){
        if(err){
            return common.send(res, 400, '', err);
        }
        else{
            return common.send(res, 200, data, 'success');
        }
    }); 
}

exports.buy =  function(req, res) {
    var Item = mongoose.model("Items", itemSchema);
    var Track = mongoose.model("Tracks", trackSchema);

    if (req.body.itemId == undefined) {
        return common.send(res, 401, '', 'item id is undefined');
    }

    if (req.body.itemName == undefined) {
        return common.send(res, 401, '', 'itemName is undefined');
    }

    if (req.body.itemCategory == undefined) {
        return common.send(res, 401, '', 'itemCategory is undefined');
    }

    if (req.body.price == undefined) {
        return common.send(res, 401, '', 'price is undefined');
    }

    if (req.body.quantity == undefined) {
        return common.send(res, 401, '', 'quantity is undefined');
    }
    
    if (req.body.ownerName == undefined) {
        return common.send(res, 401, '', 'gamer name is undefined');
    }
    
    if (req.body.ownerGamerCode == undefined) {
        return common.send(res, 401, '', 'gamer code is undefined');
    }
    
    if (req.body.isTSR == undefined) {
        return common.send(res, 401, '', 'isTSR is undefined');
    }

    var createAt = Math.round(new Date().getTime()/1000);
                
    var newTrack = new Track({
        itemId: req.body.itemId,
        itemName: req.body.itemName,
        itemCategory: req.body.itemCategory,
        price: req.body.price,
        quantity: req.body.quantity,
        ownerName: req.body.ownerName,
        ownerGamerCode: req.body.ownerGamerCode,
        isTSR: req.body.isTSR,
        createdAt: createAt
    });

    newTrack.save(function(err, result){
        if(err){
            return common.send(res, 400, '', err);
        }
        else{
            Item.findOne({itemId : req.body.itemId}).exec(function(err, data){
                if(err){
                    return common.send(res, 400, '', err);
                }
                else{
                    if (data == undefined || data == null) {
                        return common.send(res, 300, '', 'No exists.');
                    }
                    else{
                        
                        data.stock = parseInt(data.quantity) - parseInt(req.body.quantity);
        
                        data.save(function(err, result){
                            if(err){
                                return common.send(res, 400, '', err);
                            }
                            else{
                                return common.send(res, 200, '', 'success');
                            }
                        });
                    }
                }
            });
        }
    });    
}

exports.track =  function(req, res) {
    var Track = mongoose.model("Tracks", trackSchema);
    Track.find({}).sort({'ownerGamerCode': 1}).exec(function(err, data){
        if(err){
            return common.send(res, 400, '', err);
        }
        else{
            return common.send(res, 200, data, 'success');
        }
    }); 
}
