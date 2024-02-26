import mongoose, { mongo } from "mongoose";

const categroySchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    }
} , {tiemstamps : true});

const Category = new mongoose.model("Catogory" , categroySchema);

export default Category;