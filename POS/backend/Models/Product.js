const mongoose = require("mongoose")

// ! LIKE CLASS  ! \\
const ProductSchema = mongoose.Schema(
    {
        title : {type:String,require:true},
        image : {type:String,require:true},
        price : {type:Number,require:true},
        category : {type:String,require:true},
    },
{timestamps:true}
)


const Product = mongoose.mongoose.model("product",ProductSchema)

module.exports = Product