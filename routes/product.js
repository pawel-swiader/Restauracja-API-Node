const router = require("express").Router();
const Product = require("../models/Product");
const {verifyTokenAsAdmin} = require("./verifyJwtToken");



 //Create product

router.post("/", verifyTokenAsAdmin,  async (req,res)=>{
const newProduct = new Product(req.body)
try {
    const savedProduct  = await newProduct .save();
    res.status(201).json(savedProduct )
} catch (error) {
    res.status(500).json(error)
}
})


 //Update product

router.put("/:id", verifyTokenAsAdmin, async (req, res) => {
  
    try {
      const updatedProduct  = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //Delete product

router.delete("/:id", verifyTokenAsAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });

  //Get product

  router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Get products

  router.get("/",  async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router 