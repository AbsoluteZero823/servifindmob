const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    avatar: {
        public_id: {
            type: String,
            // required: true,
            //    default:'shelter/avatar_rk4v2w'
        },
        url: {
            type: String,
            // required: true,
            //    default:'https://res.cloudinary.com/dawhmjhu1/image/upload/v1651110818/shelter/avatar_rk4v2w.jpg'
        }
    },

    role: {
        type: String,
        default: "customer",
    },
    age: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    contact: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "activated"
    },

})

// userSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// userSchema.set('toJSON', {
//     virtuals: true,
// });

exports.User = mongoose.model('User', userSchema);
// exports.userSchema = userSchema;