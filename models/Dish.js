const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema(
    {
        title:{type:String, required:true, unique:true},
        ingredients:{type:Array, required:true},
        weightOrSize:{type:Number},
        price:{type:Number, required:true}
    },
    {timestamps:true}
)
module.exports = mongoose.model("Dish", DishSchema); 