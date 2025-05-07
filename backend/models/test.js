const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    class: {
        type: Number,
        required: true,
        index: true
    },
    testNumber: {
        type: Number,
        required: true,
        index: true
    },
    questions: [
        {
            question: { type: String, required: true },
            options: { type: [String], required: true },
            correctAnswer: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('Test', testSchema);