const express = require('express');
const router = express.Router();
const Test = require('../models/test');

router.get('/class/:class', async (req, res) => {
    try {
        const { class: classNumber } = req.params;
        const tests = await Test.find({ class: parseInt(classNumber) });
        res.json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch tests' });
    }
});

router.post('/test/:class/:test_number/submit', async (req, res) => { // Изменено на test_number
    try {
        const { class: classNumber, test_number } = req.params; // Изменено на test_number
        const { answers } = req.body;

        let score = 0;
        const test = await Test.findOne({ class: parseInt(classNumber), testNumber: parseInt(test_number) }); // Изменено на test_number
        if (test) {
            test.questions.forEach((question, index) => {
                if (question.correctAnswer === answers[index]) {
                    score++;
                }
            });
        }

        console.log(`Results submitted for class ${classNumber}, test ${test_number}. Score: ${score}`); // Изменено на test_number
        res.json({ message: 'Results submitted successfully', score: score });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit results', error: error.message }); // Added error message
    }
});

module.exports = router;