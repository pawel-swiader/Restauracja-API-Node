const Castomer = require("../models/Castomer");
const router = require("express").Router();
const {verifyTokenAsAnAuthorizedCastomer, verifyTokenAsAdmin} = require("./verifyJwtToken");



//Update castomer

router.put("/:id", verifyTokenAsAnAuthorizedCastomer, async (req, res) => {

    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }

    try {
      const updatedCastomer = await Castomer.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCastomer);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
 //Delete castomer

router.delete("/:id", verifyTokenAsAnAuthorizedCastomer, async (req, res) => {
    try {
      await Castomer.findByIdAndDelete(req.params.id);
      res.status(200).json("Castomer deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get castomer

  router.get("/:id", verifyTokenAsAdmin, async (req, res) => {
    try {
      const castomer = await Castomer.findById(req.params.id);
      const { password, ...others } = castomer._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  });


    //Get castomers

  router.get("/", verifyTokenAsAdmin, async (req, res) => {
    try {
      const castomers = await Castomer.find();
      res.status(200).json(castomers);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  


module.exports = router