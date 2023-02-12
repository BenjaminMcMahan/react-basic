const express = require('express');
const mongoose = require('./db')
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Mongoose connection established successfully!');
});

connection.on('error', (error) => {
    console.error(error);
});

app.get('/', (req, res) => {
    res.send({ data: 'Hello from the backend!' });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});