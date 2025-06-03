import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const adminSchema =  new mongoose.Schema({

    Email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true,
    },
    
    Password:{
        type:String,
        required: true,
    },

    Refreshtoken:{
        type:String,
    },

}) 


adminSchema.pre("save", async function (next) {
    if(!this.isModified("Password")) return next(); 
      this.Password = await bcrypt.hash(this.Password, 10)
    next()
})

adminSchema.methods.isPasswordCorrect = async function (Password){
    return await bcrypt.compare(Password, this.Password)
}

adminSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        Email:this.Email,
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

adminSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
        Email:this.Email,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

const admin = mongoose.model("admin",adminSchema);

export {admin}