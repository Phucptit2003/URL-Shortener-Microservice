const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// Setup multer: lưu file tạm vào /uploads
const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, 'uploads/'),
filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });


// Root
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// POST /api/fileanalyse or /api/fileanalyse
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
if (!req.file) return res.status(400).json({ error: 'No file uploaded' });


const { originalname, mimetype, size } = req.file;
res.json({ name: originalname, type: mimetype, size });
});


// also support legacy route
app.post('/api/filemeta', upload.single('upfile'), (req, res) => {
if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
const { originalname, mimetype, size } = req.file;
res.json({ name: originalname, type: mimetype, size });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));