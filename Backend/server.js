import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security
app.use(helmet());
// Allow images and other static resources to be loaded cross-origin in dev.
// Helmet sets Cross-Origin-Resource-Policy to 'same-origin' by default which
// causes the browser to block cross-origin image requests with a 200 response.
// Override it to 'cross-origin' for development static serving.
if (helmet && helmet.crossOriginResourcePolicy) {
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
}

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

// Serve uploads folder
// Serve uploads folder with permissive CORS for frontend dev servers
app.use("/uploads", (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    // Fallback for other dev setups; keep this permissive only for development
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  // Allow cross-origin embedding of these resources (images/fonts) in dev
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);