const express = require('express');
const app = express();
const errorHandler = require('./middlewares/error.middleware');
const logger = require('./middlewares/logger.middleware');

// Middlerware xử lý JSON
app.use(express.json());

// Route chính
app.get('/ecommerce', (request, response) => {
  response.send('Hello from Express App!');
});

app.use(logger);

// Middleware lý bắt lỗi các router phía trên
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

module.exports = app;
