import multer from "multer";
import path from "path";
import fs from "fs";

// For serverless environments (Vercel), use memory storage.
// For local dev, use disk storage.
let storage;

if (process.env.NODE_ENV === "PRODUCTION") {
  // Memory storage for serverless (no filesystem writes).
  storage = multer.memoryStorage();
} else {
  // Disk storage for local development.
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = "../uploads";
      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir, { recursive: true });
        } catch (err) {
          console.warn(
            "Cannot create uploads directory (read-only filesystem). Falling back to memory storage.",
          );
          cb(new Error("SKIP_DISK_STORAGE"));
          return;
        }
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
  });
}

const upload = multer({ storage });

export default upload;
