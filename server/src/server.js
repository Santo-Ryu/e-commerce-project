require('dotenv').config();
const app = require('./app');
const {testConnection} = require('./config/db');

const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_ADDRESS || '0.0.0.0';

testConnection().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
  });
});