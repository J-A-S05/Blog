import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import Post from '../models/Post.js'

const userRouter = express.Router();

userRouter.put("/:id" , async (req , res) => {
    if(req.body.userId == req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password , salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id , {
                $set : req.body,
            } , {new : true});
            console.log(updatedUser)
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(401).json("you are not allowed to update other's accounts")
    }
})

userRouter.delete("/:id" , async (req , res) => {
    if(req.body.userId == req.params.id){
        
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({username : user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("user deleted successfully");
            } catch (error) {
                res.status(500).json(error);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(401).json("you are not allowed to delete other's accounts")
    }
})

userRouter.get("/:id" , async (req , res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password , ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

export {userRouter}

