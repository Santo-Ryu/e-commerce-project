const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello from Express App!');
});

module.exports = app;
