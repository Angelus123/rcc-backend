import validator from "validator";
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import mongoose from "mongoose";
    const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    createdAt:{
        type: String,
        // required: true
    },
    role:{
        type: String,
        default:"user"
    },

    password: {
        type: String,
        required:  [true,'Please enter password'],
        minlength: 8,
        select:false
    },
    confirmpassword: {
        type: String,
        select:false,
        required: [true,'Re-type  password'],
        validate: {
            //this work on create and save only not update

            validator: function(el){
                return el === this.password
            },
        message: 'password not match'
        }
        
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})
//let article = module.exports= mo.model('Article',artSchma);

userSchema.pre('save',async function(next){
    //Only run this if password was actualy modified
    if(!this.isModified("password")) return next();
    //hash password with cost 12
    this.password= await bcrypt.hash(this.password, 12)
    //Delete password confirm
    this.confirmpassword =undefined
    next()

}) 
userSchema.pre(/^find/, function(next){
    // this point to current querry
    // this.find({active:  true});
    this.find({active:{$ne:false}});
    next()
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
        // console.log(candidatePassword, userPassword)
    return await bcrypt.compare(candidatePassword,userPassword)

}
userSchema.methods.changesPassordAfter = function(JWTTImestamp){
    if(this.passwordChangedAt){
        const changedTimestamp =parseInt(this.passwordChangedAt.getTime()/1000,
        10
        )
        // console.log(   ,"++++++++",JWTTImestamp,"hello")
        return JWTTImestamp<changedTimestamp
    }
    return false

}
userSchema.methods.createPasswordResetToken = function () {
 const resetToken = crypto.randomBytes(32).toString('hex');
 this.passwordResetToken = crypto
 .createHash('sha256')
 .update(resetToken)
 .digest('hex')
//  console.log((resetToken)," newwwww", this.passwordResetToken)
 this.passwordResetExpires = Date.now()+10*60*1000
 
 return resetToken
} 
const users = mongoose.model("users", userSchema);
export default users;