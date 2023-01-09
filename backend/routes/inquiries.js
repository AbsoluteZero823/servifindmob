

const { Inquiry } = require('../models/inquiry');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

const mongoose = require('mongoose');

//Start Get All
// router.get(`/`, async (req, res) => {
//     const inquiryList = await Inquiry.find().populate(['customer', 'service_id']);

//     if (!inquiryList) {
//         res.status(500).json({ success: false })
//     }
//     res.send(inquiryList);
// })
//End Get All

//Start Get All
router.get(`/`, async (req, res) => {

    const inquiryList = await Inquiry.find().populate(['customer', {path:'service_id',
     populate : {path: 'user'}}]);

    if (!inquiryList) {
        res.status(500).json({ success: false })
    }
    res.send(inquiryList);
})
//End Get All

//Start Create
router.post(`/inquireform`, async (req, res) => {
    // const category = await Category.findById(req.body.category);
    // if (!category) return res.status(400).send('Invalid Category')

    let inquiry = new Inquiry({
        instruction: req.body.instruction,
        attachments: req.body.attachments,
        status: req.body.status,
   service_id: req.body.service_id,
   customer: req.body.customer
        
//         attachments: 'try',
//         status: 'waiting',
//    service_id: '636915cdd73b1746817788fc',
//    customer: '637dbca945634ad8be700321'
   
    })

    inquiry = await inquiry.save()

    if (!inquiry)
        return res.status(404).send('cannot inquire. Try again later')

    res.send(inquiry);
})
//End Create


/// NOT USED




//Start  Get Single
router.get(`/:id`, async (req, res) => {
    const inquiry = await Inquiry.findById(req.params.id).populate(['category', 'user']);

    if (!inquiry) {
        res.status(500).json({ message: 'The inqiuiry with the given ID was not found.' })

    }
    res.status(200).send(inquiry);
})
//End Get Single



//Start Update
router.put(`/:id`, async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid inquiry Id')
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category')

    const inquiry = await Inquiry.findByIdAndUpdate(
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
        { new: true }
    )
    if (!inquiry)
        return res.status(404).send('the inquiry cannot be updated')

    res.send(inquiry);

})
//End Update

//Start Delete
router.delete(`/:id`, (req, res) => {
    Service.findByIdAndRemove(req.params.id).then(inquiry => {
        if (inquiry) {
            return res.status(200).json({ success: true, message: 'the inquiry is deleted' })

        } else {
            return res.status(404).json({ success: false, message: "inquiry not found!" })
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