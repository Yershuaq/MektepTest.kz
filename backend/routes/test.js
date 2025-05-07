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

router.post('/submit-test', async (req, res) => { // МАКСИМАЛЬНО ПРОСТОЙ МАРШРУТ
    try {
        const { answers } = req.body;

        let score = 0;
        // Временно вернем просто 0, чтобы проверить, работает ли маршрут
        console.log("Answers received:", answers); // Log the answers
        score = 0;

        res.json({ message: 'Test submitted successfully', score: score });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit results', error: error.message });
    }
});

module.exports = router;