const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());

// phục vụ file tĩnh trong /public (style.css, index.html,…)
app.use("/public", express.static(path.join(__dirname, "public")));

// trang chủ hiển thị form upload
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// cấu hình multer dùng memoryStorage
const upload = multer({ storage: multer.memoryStorage() });

// endpoint xử lý upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
