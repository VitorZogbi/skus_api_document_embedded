const mongoose = require('mongoose');
const Products = mongoose.model('ProductsWithSkus');

exports.createProduct = async (data, callback) => {

    const product = new Products(data);
    await product.save((error, docs) => {
        if (error) return callback (error, null);
        return callback (null, docs);
    })
}

exports.listProduct = async () => {

    const res = await Products.find({}, '-__v').sort({ _id: -1 });
    return res;

}

exports.listProductsPaginated = async (page, callback) => {

    const options = {

        limit: 10,
        page: page

    }

    await Products.paginate({}, options, (error, docs) => {
        if (error) return callback(error, null);
        return callback(null, docs);
    })
}

exports.findProductById = async (id, callback) => {

    await Products.findById(id, '-__v', (error, docs) => {
        if (error) return callback(error, null);
        return callback(null, docs);
    })
}

exports.updateProduct = async (id, data, callback) => {

    await Products.findByIdAndUpdate(id, { $set: data }, (error, docs) => {
        if (error) return callback(error, null);
        callback(null, docs);
    })
}



exports.deleteProduct = async (id, callback) => {

    await Products.findByIdAndDelete(id, (error, docs) => {
        if(error) return callback(error, null);
        return callback(null, docs);
    })
}