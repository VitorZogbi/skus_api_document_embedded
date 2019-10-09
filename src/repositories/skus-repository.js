const mongoose = require('mongoose');
const Skus = mongoose.model('ProductsWithSkus');

exports.createSku = async (id, data, callback) => {

    await Skus.findByIdAndUpdate(id, { $addToSet: { sku: data } }, (error, docs) => {
        if (error) return callback(error, null);
        return callback(null, docs);
    })
}

exports.updateSku = async (id, data, callback) => {
    
    await Skus.update({ 'sku._id': mongoose.Types.ObjectId(id) }, { "$set": { sku: data } }, (error, docs) => {
        if (error) return callback(error, null);
        callback(null, docs);
    })
}

exports.deleteSku = async (id, callback) => {

    await Skus.update({ "sku._id": mongoose.Types.ObjectId(id) }, { "$pull": { "sku": { "_id": mongoose.Types.ObjectId(id) } } }, (error, docs) => {
        if (error) return callback(error, null);
        return callback(null, docs);
    })
}