require('dotenv').config();
const app = require('./app');
const {testConnection} = require('./config/db');

const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_ADDRESS || '0.0.0.0';
const APP_PATH = process.env.APP_PATH || '';

console.log('----------ENV----------');
console.log('- PORT: ', PORT);
console.log('- HOST: ', HOST);
console.log('- APP_PATH: ', APP_PATH);
console.log('-----------------------')

const startServer = async () => {
  try {
    await testConnection();
    app.listen(PORT, HOST, () => {
    console.log(`🚀 Server is running at http://${HOST}:${PORT}/${APP_PATH}`);
    });
  }catch(err) {
    console.error('❗ Database connection failed:', err);
    process.exit(1); // Thoát ứng dụng nếu kết nối DB thất bại
  }
}

startServer();

// Exits
process.on('SIGTERM', () => {
  console.log('Đang tắt server...');
  server.close(() => process.exit(0));
});