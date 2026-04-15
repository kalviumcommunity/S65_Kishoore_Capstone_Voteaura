const multer = require('multer');
const path = require('path');

// ─── Storage Configuration ──────────────────────────────────────
// Files are saved to /uploads with unique timestamped names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

// ─── File Type Validation ───────────────────────────────────────
// Only allow common image formats. Reject everything else.
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(`Invalid file type: ${file.mimetype}. Only ${ALLOWED_MIME_TYPES.join(', ')} are allowed.`),
      false
    );
  }
};

// ─── Multer Instance ────────────────────────────────────────────
// Max file size: 5MB per file (reduced from 10MB for security)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 5, // Max 5 files per request
  },
});

module.exports = { upload };
