const { Service } = require('../models/service');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

const mongoose = require('mongoose');

//Start Get All
router.get(`/`, async (req, res) => {
    const serviceList = await Service.find().populate('category');

    if (!serviceList) {
        res.status(500).json({ success: false })
    }
    res.send(serviceList);
})
//End Get All

//Start  Get Single
router.get(`/:id`, async(req, res)=> {
    const service = await Service.findById(req.params.id).populate('category');

    if(!service){
        res.status(500).json({message: 'The service with the given ID was not found.'})

    }
    res.status(200).send(service);
})
//End Get Single

//Start Create
router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    let service = new Service({
        title: req.body.title,
        category: req.body.category,
        experience: req.body.experience,
        freelancer_id: req.body.freelancer_id,
        status: req.body.status,
        images: {
            url: req.body.url,
            public_id: req.body.public_id
        },
        user_id: req.body.user_id
    })

    service = await service.save()

    if (!service)
        return res.status(404).send('the service cannot be created')

    res.send(service);
})
//End Create

//Start Update
router.put(`/:id`, async (req, res)=>{
    
if(!mongoose.isValidObjectId(req.params.id)){
    res.status(400).send('Invalid Service Id')
}
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const service = await Service.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            category: req.body.category,
            experience: req.body.experience,
            freelancer_id: req.body.freelancer_id,
            status: req.body.status,
            images: {
                url: req.body.url,
                public_id: req.body.public_id
            },
            user_id: req.body.user_id
        },
        { new: true}
    )
    if (!service)
    return res.status(404).send('the service cannot be updated')

    res.send(service);
    
})
//End Update

//Start Delete
router.delete(`/:id`, (req, res) => {
    Service.findByIdAndRemove(req.params.id).then(service => {
        if (service) {
            return res.status(200).json({ success: true, message: 'the service is deleted' })

        } else {
            return res.status(404).json({ success: false, message: "service not found!" })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})
//End Delete

//Start Count

router.get(`/get/count`, async (req, res) => {
    const serviceCount = await Service.countDocuments((count) => count).clone()


    if (!serviceCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        count: serviceCount
    });
    // res.send(serviceCount);
})

//End Count

module.exports = router;