import express from 'express'
import Category from '../models/Category.js'

const catRouter = express.Router();

catRouter.post("/" , async (req , res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(error);
    }
    
})

catRouter.get("/" , async (req , res) => {
    
    try {
        const cats = await Category.find()
        res.status(200).json(cats);
    } catch (error) {
        res.status(500).json(error);
    }
    
})

export {catRouter}
