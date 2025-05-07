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
        res.status(500).json({ message: 'Failed to fetch tests', error: error.message });
    }
});

router.post('/test/class/:class/:test_number/submit', async (req, res) => { // ТОЧНО ТАКОЙ МАРШРУТ
    try {
        const { class: classNumber, test_number } = req.params; // ТОЧНО ТАКОЙ МАРШРУТ
        const { answers } = req.body;

        let score = 0;
        const test = await Test.findOne({ class: parseInt(classNumber), testNumber: parseInt(test_number) }); // ТОЧНО ТАКОЙ МАРШРУТ
        if (test) {
            test.questions.forEach((question, index) => {
                if (question.correctAnswer === answers[index]) {
                    score++;
                }
            });
        }

        console.log(`Results submitted for class ${classNumber}, test ${test_number}. Score: ${score}`); // И ТУТ ТОЖЕ
        res.json({ message: 'Results submitted successfully', score: score });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit results', error: error.message });
    }
});

module.exports = router;