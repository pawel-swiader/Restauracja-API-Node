const router = require("express").Router();
const Castomer = require("../models/Castomer");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Casstomer register

router.post("/register", async (req, res)=>{
    const newCastomer = new Castomer({
        username:req.body.username,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        email:req.body.email
    });
    try{

        const savedCastomer =  await newCastomer.save()
        res.status(201).json(savedCastomer) 

    }
    catch(error){
        res.status(500).json(error);
    }
   
});


//Castomer login

router.post("/login", async(req,res)=>{
    try{
        const castomer = await Castomer.findOne(
            {
                username: req.body.username
            }
        );

        !castomer && res.status(401).json("Your username is wrong.");

        const hashedPassword = CryptoJS.AES.decrypt(
            castomer.password,
            process.env.PASS_SEC
        );

        const correctPassword = hashedPassword.toString(CryptoJS.enc.Utf8)


        correctPassword!==req.body.password && res.status(401).json("Your password is wrong.");
        

        const jwtToken = jwt.sign({
            id:castomer._id,
            isAdmin: castomer.isAdmin,
            
        }, process.env.JWT_SEC,
        {expiresIn:"30m"}
        );


        const {password, ...others}=castomer._doc;
        res.status(200).json({...others, jwtToken});


    }
   
    catch(error){
        res.status(400).json(error)
    }

})


module.exports = router