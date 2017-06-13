var mongoose = require('mongoose');

// Define our product schema
var ProductSchema = new mongoose.Schema({
    p_name: String,
    p_quanty: Number,
    price: Number,
    image: String
});

// Export the Mongoose model
module.exports = mongoose.model('Product', ProductSchema);