const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')

const productsWithSkus = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        default: false
    },

    sku: [
            {
                color: {
                    type: String,
                    
                },

                size: {
                    type: String
                    
                },

                price: {
                    type: Number
                    
                },

                stockLevel: {
                    type: Number
                    
                },

                active: {
                    type: Boolean
                                        
                }        
            }
        ]

});

productsWithSkus.plugin(mongoosePaginate);

productsWithSkus.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('ProductsWithSkus', productsWithSkus);