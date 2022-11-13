const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();


//Start Get All
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.send(categoryList);
})
//End Get All

//Start  Get Single
router.get(`/:id`, async(req, res)=> {
    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({message: 'The category with the given ID was not found.'})

    }
    res.status(200).send(category);
})
//End Get Single

//Start Create
router.post(`/`, async (req, res) => {
    let category = new Category({
        name: req.body.name
    })

    category = await category.save()

    if (!category)
        return res.status(404).send('the category cannot be created')

    res.send(category);
})
//End Create

//Start Update
router.put(`/:id`, async (req, res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name
        },
        { new: true}
    )
    if (!category)
    return res.status(404).send('the category cannot be updated')

    res.send(category);
    
})
//End Update

//Start Delete
router.delete(`/:id`, (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'the category is deleted' })

        } else {
            return res.status(404).json({ success: false, message: "category not found!" })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})
//End Delete

module.exports = router;