import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";

// Ensure uploads directory exists
const uploadsBaseDir = process.env.VERCEL
  ? path.join(os.tmpdir(), "uploads")
  : path.join(process.cwd(), "uploads");

const uploadsDir = uploadsBaseDir;
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage });

export default upload;
