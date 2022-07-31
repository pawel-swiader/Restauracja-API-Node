const router = require("express").Router();
const Order = require("../models/Order");
const {verifyTokenAsAnAuthorizedCastomer, verifyTokenAsAdmin} = require("./verifyJwtToken");


 //Create order

 router.post("/", verifyTokenAsAnAuthorizedCastomer,  async (req,res)=>{
    const newOrder= new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
    })
    
    
    //Update order

    router.put("/:id", verifyTokenAsAnAuthorizedCastomer, async (req, res) => {
      
        try {
          const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedOrder);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    
    
    //Delete order

    router.delete("/:id", verifyTokenAsAnAuthorizedCastomer, async (req, res) => {
        try {
          await Order.findByIdAndDelete(req.params.id);
          res.status(200).json("Order deleted.");
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
    
      //Get order

      router.get("/:castomerId", verifyTokenAsAnAuthorizedCastomer , async (req, res) => {
        try {
          const order= await Order.findOne({castomerId: req.params.castomerId});
          res.status(200).json(order);
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
      //Get orders

      router.get("/", verifyTokenAsAdmin, async (req, res) => {
       try {
           const orders = await Order.find();
           res.status(200).json(orders);
       } catch (error) {
           res.status(500).json(error);
       }
      });
      

module.exports = router 