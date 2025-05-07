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

router.post('/test/:class/:testNumber/submit', async (req, res) => {
    try {
        const { class: classNumber, testNumber } = req.params;
        const { answers } = req.body; // Changed from 'results' to 'answers'

        //  Logic to save the results (This is a placeholder - adapt to your needs)
        //  For example, you might want to:
        //  1.  Store the results in a new collection (e.g., 'TestResult')
        //  2.  Update the user's document with the test results
        //  3.  Calculate a score and store that

        let score = 0;
        const test = await Test.findOne({ class: parseInt(classNumber), testNumber: parseInt(testNumber) });
        if (test) {
            test.questions.forEach((question, index) => {
                if (question.correctAnswer === answers[index]) {
                    score++;
                }
            });
        }

        console.log(`Results submitted for class ${classNumber}, test ${testNumber}. Score: ${score}`);
        res.json({ message: 'Results submitted successfully', score: score });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit results' });
    }
});

module.exports = router;