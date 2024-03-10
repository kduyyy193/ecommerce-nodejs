'use strict'

const mongoose = require('mongoose'); // Erase if already required

const COLLECTION_NAME = 'Shops'
const DOCUMENT_NAME = 'Shop'

// Declare the Schema of the Mongo model
const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        maxLength: 150,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    verify: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
    },
    roles: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);