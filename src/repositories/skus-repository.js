const mongoose = require('mongoose');
const Skus = mongoose.model('ProductsWithSkus');

exports.createSku = async (id, data, callback) => {

    await Skus.findByIdAndUpdate(id, { $addToSet: { sku: data } }, (error, docs) => {
        if (error) return callback(error, null);
        return callback(null, docs);
    })
}

exports.listSkus = async () => {

    const res = await Skus.find({}, {
        _id: 0, sku: 1}).sort({ _id: -1 });
    return res;

}

exports.listSkusPaginated = async (page, callback) => {

    const options = {
        
        select: { _id: 0, "sku": 1 },
        limit: 10,
        page: page        
        
    }

    await Skus.paginate({}, options , (error, docs) => {
        if (error) return callback(error, null);
        return callback(null, docs);
    })
}

exports.findSkuById = async (id, callback) => {
    
    await Skus.findOne({ sku: { $elemMatch: { _id: mongoose.Types.ObjectId(id) }}}, { _id:0, 'sku.$': 1}, (error, docs) => {
        if (error) return callback(error, null);
        return callback(null, docs);
    })
}

exports.updateSku = async (id, data, callback) => {
    
    await Skus.updateOne({ sku: {$elemMatch: { _id: mongoose.Types.ObjectId(id) } } }, { $set: { "sku.$.color": data.color, "sku.$.size": data.size, "sku.$.price": data.price, "sku.$.stockLevel": data.stockLevel, "sku.$.active": data.active } }, (error, docs) => {
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