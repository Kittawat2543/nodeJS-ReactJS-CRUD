const modelProduct = require("../models/modelProduct");

exports.read = async (req, res) => {
  try {
    const id = req.params.id;

    const listProduct = await modelProduct.findOne({ _id: id }).exec();

    res.send(listProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.list = async (req, res) => {
  try {
    const listProduct = await modelProduct.find({}).exec();

    res.send(listProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const createProduct = await modelProduct(req.body).save();

    res.send(createProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await modelProduct
      .findOneAndUpdate({ _id: id }, req.body, { new: true })
      .exec();

    res.send(updated);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await modelProduct.findOneAndDelete({ _id: id }).exec();

    res.send(removed);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
