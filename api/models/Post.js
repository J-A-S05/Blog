import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    postTitle : {
        type : String,
        required : true,
        unique : true
    },
    desc : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : false
    },
    username : {
        type : String,
        required : true
    },
    categories : {
        type : Array,
        required : false
    }

} , {timestamps : true});

const Post = new mongoose.model("Post" , postSchema);

export default Post;