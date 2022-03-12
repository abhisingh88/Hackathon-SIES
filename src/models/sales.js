const mongoose = require("mongoose")

// Defining Schema
const salesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    no_of_persons: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    slotTiming: {
        type: String,
        required: true
    },
    date_of_visit: {
        type: String,
        // required: true
        default: 0,
    },
    contactNo: {
        type: String,
        // required: true
    },
    comments: {
        type: String,
    },
})


// Defining Collection

const SalesDB = new mongoose.model("SalesDatabase", salesSchema)

module.exports = SalesDB;