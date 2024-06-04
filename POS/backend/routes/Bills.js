// ! SUMMON THE MODEL ! \\
const { model } = require("mongoose")
const Bill = require("../Models/Bill.js")
// ! SUMMON THE EXPRESS ! \\
const express = require("express")
// ! SUMMON EXPRESS ROUTER !\\
const router = express.Router()


// ! GET ALL BILLS ! \\
router.get("/get-all",async (req,res) => {
    try {
        const bills = await Bill.find()
        res.status(200).json(bills)
    } catch (error) {
        res.status(500).json(error)
    }
})


// ! CREATE ! \\
router.post("/add-bill",async (req,res) => {
    try {
        const newBill = new Bill(req.body)
        await newBill.save()
        res.status(200).json("Added Bill Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router



// ! IN SERVER JS SUMMON THIS ! \\



// // ! UPDATE ! \\
// router.put("/update-bill",async (req,res) => {
//     try {
//         await Bill.findOneAndUpdate({ _id: req.body.billId },req.body)
//         res.status(200).json("Bill Updated Successfully")
//     } catch (error) {
//         console.log(error)
//     }
// })


// // ! DELETE ! \\
// router.delete("/delete-bill",async (req,res) => {
//     try {
//         await Bill.findOneAndDelete({ _id: req.body.billId })
//         res.status(200).json("Bill Deleted Successfully")
//     } catch (error) {
//         console.log(error)
//     }
// })