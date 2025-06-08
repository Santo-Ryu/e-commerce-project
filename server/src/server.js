require('dotenv').config();
const app = require('./app');
const {testConnection} = require('./config/db');

const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_ADDRESS || '0.0.0.0';

const startServer = async () => {
  try {
    await testConnection();
    app.listen(PORT, HOST, () => {
    console.log(`🚀 Server is running at http://${HOST}:${PORT}/ecommerce`);
    });
  }catch(err) {
    console.error('❗ Database connection failed:', error);
    process.exit(1); // Thoát ứng dụng nếu kết nối DB thất bại
  }
}

startServer();