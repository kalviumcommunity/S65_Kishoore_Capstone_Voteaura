// ─── Load Environment Variables First ───────────────────────────
// dotenv must be loaded BEFORE any process.env usage
require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./Config/db');
const { initSocket } = require('./Config/socket');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

// ─── Initialize App ─────────────────────────────────────────────
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// ─── Initialize Socket.io ───────────────────────────────────────
initSocket(server);

// ─── Security Middleware ────────────────────────────────────────
// Helmet sets various HTTP headers to protect against common attacks
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow serving uploaded images
}));

// Rate limiting: Prevent brute-force and DDoS attacks
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // Default: 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,              // Default: 100 requests per window
  message: { message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ─── General Middleware ─────────────────────────────────────────
// CORS: Allow requests from the frontend origin
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Parse JSON and URL-encoded request bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (concise output in production, detailed in dev)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Serve uploaded files as static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── API Routes ─────────────────────────────────────────────────
app.use('/api', routes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'VoteAura API is running',
    timestamp: new Date().toISOString(),
  });
});

// ─── Error Handling ─────────────────────────────────────────────
// Centralized error handler (must be AFTER all routes)
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────────────
server.listen(PORT, () => {
  connectDB();
  console.log(`\n🚀 VoteAura server running on port ${PORT}`);
  console.log(`📡 Socket.io ready for real-time connections`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
