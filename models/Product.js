const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        products:[{
            productName:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            }
        }
    ]
}
)
module.exports = mongoose.model("Product", ProductSchema); 