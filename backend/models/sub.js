const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    Subname: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        required: true,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
        message: '{VALUE} is not supported',

    },
    startDate: {
        type: Date,
        required: true

    },
    endDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['Active', 'Paused', 'Cancelled'],
        message: '{VALUE} is not supported',
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const subDetails = mongoose.model("Subscription", subscriptionSchema);
module.exports= subDetails;