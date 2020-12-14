const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      new Error(
        "The file type should be jpeg or png. Other file types are not accepted"
      ),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//Importing product module
const Product = require("../models/Products");

//Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .select("productName productImage _id price views")
      .exec();
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//Get Individual product
//Pass _id as parameter
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json({ products: product });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//Post a product
router.post("/", upload.single("productImage"), async (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    productName: req.body.productName,
    productDetail: req.body.productDetail,
    productDescription: req.body.productDescription,
    productImage: req.file.path,
    manufacturer: req.body.manufacturer,
    category: req.body.category,
    subcategory: req.body.subcategory,
    price: req.body.price,
    quantity: req.body.quantity,
    views: req.body.views,
  });

  try {
    const savedProduct = await product.save();
    res.status(200).json({
      message: "Product Saved succesfully",
      savedProduct: savedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//Delete a product
router.delete("/:productId", async (req, res) => {
  try {
    const deletedProduct = await Product.remove({ _id: req.params.productId });
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//Update a product
router.patch("/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.productId },
      {
        $set: {
          _id: req.params.productId,
          productDetail: req.body.productDetail,
          productName: req.body.productName,
          productDescription: req.body.productDescription,
          manufacturer: req.body.manufacturer,
          category: req.body.category,
          subcategory: req.body.subcategory,
          price: req.body.price,
          quantity: req.body.quantity,
          views: req.body.views,
        },
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
