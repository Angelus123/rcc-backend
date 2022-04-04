import validator from "validator";
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
        // required: true
    },
    createdAt: {
        type: String,
        // required: true
    },
})
//let article = module.exports= mo.model('Article',artSchma);
const messages = mongoose.model("myBrandMessages", messageSchema);
export default messages;