const Dish = require("../models/Dish");
const router = require("express").Router();
const {verifyTokenAsAdmin} = require("./verifyJwtToken");



 //Create dish

router.post("/", verifyTokenAsAdmin,  async (req,res)=>{

const newDish = new Dish(req.body)

try {
    const savedDish = await newDish.save();
    res.status(201).json(savedDish)
} catch (error) {
    res.status(500).json(error)
}
})


 //Update dish

router.put("/:id", verifyTokenAsAdmin, async (req, res) => {
  
    try {
      const updatedDish = await Dish.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDish);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //Delete dish

router.delete("/:id", verifyTokenAsAdmin, async (req, res) => {
    try {
      await Dish.findByIdAndDelete(req.params.id);
      res.status(200).json("Dish deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Get dish

  router.get("/:id", async (req, res) => {
    try {
      const dish = await Dish.findById(req.params.id);
      res.status(200).json(dish);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get dishes
  
  router.get("/",  async (req, res) => {

    const  ingredientsQuery = req.query.ingredients;

    try {
      let dishes;
      if(ingredientsQuery){
        dishes = await Dish.find({ingredients:{
            $in:[ingredientsQuery],
        }, });}
    else{
          dishes = await Dish.find();
      }
      res.status(200).json(dishes);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router 