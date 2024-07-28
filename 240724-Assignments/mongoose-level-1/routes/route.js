const express = require("express");
const UserModel = require("../models/user.model")
const ProductModel = require("../models/products.model")
const data = express.Router()
//  ----------users------------

 // -----------------post req-----------------

data.post("/add-user", async(req,res) => {
    const {username, email, password} = req.body;
    try {
    
    const existingUser = await UserModel.findOne({ $or: [{username}, {email}] });
        if(existingUser) {
            return res.status(400).send("User already exist")
        }
        const user = new UserModel({
            username,
            email,
            password
        });
        await user.save();
        res.status(201).send("User Added Successfully")
    } catch (error) {
        res.status(404).send("Error due to adding user")
    }
})

// --------------------get-all req------------------

data.get("/get-user", async(req,res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({users})
    } catch (error) {
        res.status(404).send("Error due to fetching user")
    }
})

// --------------------get req by id------------------

data.get("/get-user/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const getUser = await UserModel.find({_id:id}, req.body);
        res.status(200).json({"Message":"user fetched", getUser})
    } catch (error) {
        res.status(404).send(`Error due to fetching user ${error}`)
    }
})

// ------------------- patch req ----------------

data.patch("/update-user/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const updateUser = await UserModel.findByIdAndUpdate({_id:id}, req.body);
        res.status(200).json({"Message":"Updated Successfully", updateUser});
    } catch (error) {
        res.status(404).send(`Error due to updating user ${error}`)
    }
})

// ------------------ delete req -----------------

data.delete("/delete-user/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const deleteUser = await UserModel.findByIdAndDelete({_id:id});
        res.status(200).json({"Message":"Deleted Successfully", deleteUser});
    } catch (error) {
        res.status(404).send(`Error due to deleting user ${error}`)
    }
})


// --------------- PRODUCT ------------------

// --------- post req --------------, 

data.post ("/add-product", async(req,res)=>{
    const {title, price, description, category} = req.body;
    try {
        const addProduct = new ProductModel({
            title, 
            price,
            description,
            category
        })
        await addProduct.save();
        res.status(201).send("Product added Successfully")
    } catch (error) {
        res.status(404).send(`Error due to adding product ${error}`)
    }
})

// --------------get req--------------

data.get ("/get-products", async(req,res) => {
    try {
        const getProducts = await ProductModel.find();
        res.status(200).json(getProducts)
    } catch (error) {
        res.status(404).send(`Error due to product fetched ${error}`)
    }
})

// -------------------get by id req -----------

data.get("/get-product/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const getProduct = await ProductModel.find({_id:id}, req.body)
        res.status(200).json(getProduct);
    } catch (error) {
        res.status(404).send(`Error due to product fetching by id ${error}`)
    }
})

// ----------------patch req ----------------

data.patch("/update-product/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(404).send(`Error due to updating data ${error}`)
    }
})

// ----------------delete req-----------------

data.delete("/delete-product/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete({_id:id});
        res.status(200).json(deleteProduct);
    } catch (error) {
        res.status(404).send(`Error due to deleting product ${error}`)
    }
})

module.exports = data


