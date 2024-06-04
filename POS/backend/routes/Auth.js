// ! SUMMON THE MODEL ! \\
const { model } = require("mongoose")
const User = require("../Models/User.js")
// ! SUMMON THE EXPRESS ! \\
const express = require("express")
// ! SUMMON EXPRESS ROUTER !\\
const router = express.Router()
// ! IMPORT BCRYPTJS TO HAS PASSWORD ! \\
const bcryptjs = require("bcrypt")


// ! REGISTER ! \\
router.post("/register",async (req,res) => {
    try {
        const { userName ,email , password} = req.body
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser = new User({
            userName,email,password : hashedPassword
        })
        await newUser.save()

        res.status(200).json("Added User Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})



// ! LOGIN ! \\
router.post("/login",async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if(!user){
           return res.status(404).send({error : "User Not Found!"})
        }

        const validPassword = await bcryptjs.compare(
            req.body.password,
            user.password
        )

        if(!validPassword){
            res.status(403).json("Invalid Password")
        }else{
            res.status(200).json(user)
        }

    } catch (error) {
        res.status(500).json(error)
    }
})








module.exports = router



// ! IN SERVER JS SUMMON THIS ! \\