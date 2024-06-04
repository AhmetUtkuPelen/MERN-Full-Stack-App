// ! SUMMON THE MODEL ! \\
const { model } = require("mongoose")
const Product = require("../Models/Product.js")
// ! SUMMON THE EXPRESS ! \\
const express = require("express")
// ! SUMMON EXPRESS ROUTER !\\
const router = express.Router()


// ! GET ALL PRODUCTS ! \\
router.get("/get-all",async (req,res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json(error)
    }
})


// ! CREATE ! \\
router.post("/add-product",async (req,res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(200).json("Added Item Successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})


// ! UPDATE ! \\
router.put("/update-product",async (req,res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.body.productId },req.body)
        res.status(200).json("Product Updated Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})


// ! DELETE ! \\
router.delete("/delete-product",async (req,res) => {
    try {
        await Product.findOneAndDelete({ _id: req.body.productId })
        res.status(200).json("Product Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router



// ! IN SERVER JS SUMMON THIS ! \\