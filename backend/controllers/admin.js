const Product = require("../models/product");

exports.getSingleProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.status(404).send({ message: "No Data found" });
    });
};

exports.getAddedProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.status(404).send({ message: "No Data found" });
    });
};

exports.postNewProduct = (req, res, next) => {
  const { product, price } = req.body;
  Product.create({ product, price })
    .then(() => {
      res.status(201).send({ message: "post created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    });
};

exports.editProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      product.product = req.body.product;
      product.price = req.body.price;
      return product.save();
    })
    .then(() => {
      res.status(201).send({ message: "Edited and saved" });
    })
    .catch((err) => {
      res.status(405).send({ message: "Method not allowed" });
    })

    .catch((err) => {
      res.status(404).send({ message: "No Data found" });
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.status(200).send({ message: "Deleted" });
    })
    .catch((err) => {
      res.status(405).send({ message: "Method not allowed" });
    })

    .catch((err) => {
      res.status(404).send({ message: "No Data found" });
    });
};
