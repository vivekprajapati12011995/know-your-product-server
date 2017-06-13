var Product = require('./models/product');


exports.postProduct = function (req, res) {
    var product = new Product();

    // Set the product properties that came from the POST data
    product.p_name = req.body.p_name;
    product.p_quanty = req.body.p_quanty;
    product.p_quanty = req.body.p_quanty;
    product.price = req.body.price;
    product.image = req.body.image;


    // Save the product and check for errors
    product.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'product added', data: product });
    })
};

exports.getProducts = function (req, res) {
    Product.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.json(products);
    })
}


// Create endpoint /api/products/:product_id for GET
exports.getProduct = function (req, res) {
    // Use the product model to find a specific product
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            res.send(err);
        }


        res.json(product);
    });
};

exports.updateProduct = function (req, res) {
    // Use the product model to find a specific product
    Product.findById(req.params.id, function (err, product) {
        if (err)
            res.send(err);

        // Update the existing product quantity
        product.p_name = req.body.p_name;
        product.p_quanty = req.body.p_quanty;
        product.price = req.body.price;
        product.image = req.body.image;

        // Save the product and check for errors
        product.save(function (err) {
            if (err)
                res.send(err);

            res.json(product);
        });
    });
};

exports.deleteProduct = function (req, res) {
    // Use the product model to find a specific product and remove it
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'product removed from DB' });
    });
};
