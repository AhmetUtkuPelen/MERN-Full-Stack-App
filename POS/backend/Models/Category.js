const mongoose = require("mongoose")

// ! LIKE CLASS  ! \\
const CategorySchema = mongoose.Schema(
    {
        title : {type:String,require:true},
    },
{timestamps:true}
)


const Category = mongoose.mongoose.model("categories",CategorySchema)

module.exports = Category