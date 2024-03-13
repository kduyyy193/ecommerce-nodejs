'use strict'

const mongoose = require('mongoose'); // Erase if already required

const COLLECTION_NAME = 'ApiKeys'
const DOCUMENT_NAME = 'ApiKey'

// Declare the Schema of the Mongo model
var apiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    permisstions: {
        type: [String],
        required: true,
        enum: ["0000", "0001", "0002"],
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, apiKeySchema);