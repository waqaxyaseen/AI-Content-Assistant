import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import contentRoutes from './routes/contentRoutes';
import imageRoutes from './routes/imageRoutes';
import analysisRoutes from './routes/analysisRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'AI Service',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Routes
app.use('/content', contentRoutes);
app.use('/images', imageRoutes);
app.use('/analysis', analysisRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `AI Service route ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  logger.info(`AI Service running on port ${PORT}`);
});

export default app;