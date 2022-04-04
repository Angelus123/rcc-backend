import validator from "validator";
import mongoose from "mongoose";
    const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
      
    },
    article:{
        type: String,
        required: true
    },
    imagesUrl:{
        type: String,
      

    },
    authorId:{
        type: String,
        // required: true
    },
    createdAt: {
        type: String,
        // required: true
    },
    comments: {
        type: Array,

    },
    author:{
        type: String,
        // required: true
    }, 

})
//let article = module.exports= mo.model('Article',artSchma);
const blog = mongoose.model("Blog", blogSchema);
export default blog;