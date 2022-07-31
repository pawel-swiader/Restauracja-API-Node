const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const castomerRoute = require("./routes/castomer");
const productRoute = require("./routes/product");
const dishRoute = require("./routes/dish");
const orderRoute = require("./routes/order");


const app = express();
dotenv.config();


mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log("MongoDB connection is successsfull."))
     .catch((error)=>{
         console.log(error);
     });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/castomers", castomerRoute);
app.use("/api/products", productRoute);
app.use("/api/dishes", dishRoute);
app.use("/api/orders", orderRoute);



app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Backend server is running.`);
}) 