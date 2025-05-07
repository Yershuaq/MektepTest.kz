const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors({
    origin: 'http://localhost:63343', // Или точный адрес Frontend (без пути к файлу)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type',
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('MektepTest Backend is running!');
});

app.use('/auth', authRoutes);
app.use('/test', testRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});