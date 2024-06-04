const express = require("express")

// ! CREATE MONGODB ! \\
const mongoose = require("mongoose")

const dotenv = require("dotenv")

const app = express()

const cors = require("cors")

const logger = require("morgan")

// ! DEFINE A PORT ! \\
const PORT = 5000

// ! MODEL ROUTES ! \\
const categoryRoute = require("./routes/Categories.js")
const productRoute = require("./routes/Products.js")
const billRoute = require("./routes/Bills.js")
const authRoute = require("./routes/Auth.js")
const userRoute = require("./routes/Users.js")


dotenv.config()

// ! CONNECT MONGO DB ! \\

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB IS ACTIVE")
    }catch(error){
        throw error
    }
}



// ! MIDDLEWARE ! \\
app.use(express.json())
app.use(cors())
app.use(logger("dev"))

app.use("/api/categories",cors(),categoryRoute)
app.use("/api/products",cors(),productRoute)
app.use("/api/bills",cors(),billRoute)
app.use("/api/auth",cors(),authRoute)
app.use("/api/users",cors(),userRoute)



app.listen(PORT,() => {
    connect()
    console.log(`DNJASDJBASUIJBDADJB ${PORT}`)
})