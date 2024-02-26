import express from 'express'
import User from '../models/User.js';
import Post from '../models/Post.js';

const postRouter = express.Router();

postRouter.post("/" , async (req , res) => {
    const newPost = await new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
})

postRouter.put("/:id" , async (req , res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id , {
                    $set : req.body
                } , {new : true});

                res.status(200).json(updatePost);
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else{
            res.status(401).json("you can only update your posts");
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

postRouter.delete("/:id" , async (req , res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                await Post.findByIdAndDelete(req.params.id)

                res.status(200).json("post deleted successfully");
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else{
            res.status(401).json("you can only delete your posts");
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

postRouter.get("/:id" , async (req , res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

postRouter.get("/" , async (req , res) => {
    try {
        const username = req.query.user;
        const catName = req.query.cat;
        let posts;
        if(username){
            posts = await Post.find({username : username});
        }else if(catName){
            posts = await Post.find({categories : {
                $in : [catName]
            }})
        }else{
            posts = await Post.find();
        }
        
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})

export {postRouter}