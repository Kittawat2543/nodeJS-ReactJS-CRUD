const modelProduct = require("../models/modelProduct");
const fs = require("fs")

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

    var data = req.body
    if (req.file) {
      data.file = req.file.filename;
    }

    const createProduct = await modelProduct(data).save();
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

    if (removed?.file) {
      await fs.unlink("./uploads/" + removed.file , (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Remove success") 
        }
      })
    }

    res.send(removed);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
