const express = require('express');
const app = express();
require('dotenv').config();
const errorHandler = require('./middlewares/error.middleware');
const logger = require('./middlewares/logger.middleware');
const userRoutes = require('./routes/user.route');

const PATH = process.env.APP_PATH || ''

// Logger
app.use(logger);

// Middlerware xử lý JSON
app.use(express.json());

// Parse URL-encoded
app.use(express.urlencoded({ extended: true }));

// Route chính
app.get(`/${PATH ? PATH : ''}`, (request, response) => {
  response.send('Hello from Express App!');
});

// Routes
app.use(`/${PATH}/api`, userRoutes);

// Middleware lý bắt lỗi các router phía trên
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

module.exports = app;
