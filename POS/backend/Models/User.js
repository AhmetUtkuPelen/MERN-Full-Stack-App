const mongoose = require("mongoose")

// ! LIKE CLASS  ! \\
const UserSchema = mongoose.Schema(
    {
        userName : {type:String,require:true},
        email : {type:String,require:true},
        password : {type:String,require:true},
    },
{timestamps:true}
)


const User = mongoose.mongoose.model("users",UserSchema)

module.exports = User