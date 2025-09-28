import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.WEB_URL, process.env.MOBILE_APP_SCHEME].filter(Boolean) as string[]
    : ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:19006'],
  credentials: true
}));

// Compression and parsing
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Swagger documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Content Assistant API',
      version: '1.0.0',
      description: 'API Gateway for AI Content Assistant Platform',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'API Gateway',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Service proxy configurations
const serviceProxies = {
  '/api/auth': {
    target: 'http://auth-service:3001',
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }
  },
  '/api/content': {
    target: 'http://content-service:3002',
    changeOrigin: true,
    pathRewrite: { '^/api/content': '' },
    onProxyReq: (proxyReq: any, req: any) => {
      // Add auth headers to content requests
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.id);
        proxyReq.setHeader('X-User-Role', req.user.role);
      }
    }
  },
  '/api/ai': {
    target: 'http://ai-service:3003',
    changeOrigin: true,
    pathRewrite: { '^/api/ai': '' },
    onProxyReq: (proxyReq: any, req: any) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.id);
        proxyReq.setHeader('X-User-Plan', req.user.plan);
      }
    }
  },
  '/api/users': {
    target: 'http://user-service:3004',
    changeOrigin: true,
    pathRewrite: { '^/api/users': '' },
    onProxyReq: (proxyReq: any, req: any) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.id);
      }
    }
  },
  '/api/analytics': {
    target: 'http://analytics-service:3005',
    changeOrigin: true,
    pathRewrite: { '^/api/analytics': '' },
    onProxyReq: (proxyReq: any, req: any) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.id);
      }
    }
  },
  '/api/notifications': {
    target: 'http://notification-service:3006',
    changeOrigin: true,
    pathRewrite: { '^/api/notifications': '' }
  }
};

// Apply authentication middleware to protected routes
app.use('/api/content', authMiddleware);
app.use('/api/ai', authMiddleware);
app.use('/api/users', authMiddleware);
app.use('/api/analytics', authMiddleware);
app.use('/api/notifications', authMiddleware);

// Setup service proxies
Object.entries(serviceProxies).forEach(([path, config]) => {
  app.use(path, createProxyMiddleware(config));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
  logger.info(`Documentation available at http://localhost:${PORT}/api/docs`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;