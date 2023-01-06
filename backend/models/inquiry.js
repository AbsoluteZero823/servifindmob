const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema({
    instruction: {
        type: String,
        required: true
    },
    attachments: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },

 

})

exports.Inquiry = mongoose.model('Inquiry', inquirySchema);