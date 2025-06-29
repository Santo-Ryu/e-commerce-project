const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const uploadDir = '../uploads';

// Tạo thư mục uploads nếu chưa có
fs.mkdirSync(uploadDir, { recursive: true });

// Lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.mimetype.startsWith('image') ? 'images' :'videos';
    const dir = `${uploadDir}/${fileType}/`;
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) =>
    cb(null, uuidv4() + '_' + Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Xóa file
const deleteFile = (req, res, next) => {
  const { fileName, type } = req.body;
  if (!fileName || !type) {
    return res.status(400).json({ error: 'Thiếu thông tin file cần xóa' });
  }

  const filePath = path.resolve(__dirname, `${uploadDir}/${type}/${fileName}`);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) return res.status(500).json({ error: 'Lỗi khi xóa file' });
      console.log(`File ${fileName} đã được xóa!`);
      next();
    });
  } else {
    res.status(404).json({ error: 'File không tồn tại' });
  }
};

module.exports = { upload, deleteFile };