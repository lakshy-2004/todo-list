import express from "express";
import bcrypt from "bcryptjs";


import User from '../models/user.js';

const router = express.Router(); // to call api mongodb

// sign up

router.post("/register", async (req,res) => {
    try {
        const {email, username, password} = req.body;
        const hashPassword = bcrypt.hashSync(password);
        
        const user = new User({email, username, password: hashPassword}); //saving data to User schema
        await user.save().then(() =>{
            // res.status(200).json({message: "SignUp Successfull"})
            const {password , ...others} = user._doc; // give everyting from User Database except password
            res.status(200).json({others});
        }
        );
    } catch (error) {
        res.status(200).json({message: "User Already Exists"});
    }
});

// log in

router.post("/signin", async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(200).json({message: "Please Sign Up First"});
        }
        else {
            const isPasswordCorrect = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if(!isPasswordCorrect){
                res.status(200).json({message: "Incorrect Email or Password"});
            }
            else{
                const {password , ...others} = user._doc; // give everyting from User Database except password
                res.status(200).json({others});
            }
        }

    } catch (error) {
        res.status(200).json({message: "User Already Exists"});
    }
});

export default router;