import express from 'express'
import { ConnetDB } from './config/db_config.js';
import { MONGO_URI, PORT } from './config/env_config.js';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middleware/cors_middleware.js';
import authRoute from './routes/auth_route.js';
import { errorHandler } from './middleware/errorhandler_middleware.js';
import helmet from 'helmet'
const app = express();

// Middleware
app.use(corsMiddleware);
app.use(helmet())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoute);

// Error-Handler Middleware
app.use(errorHandler);

// Connect to DB
ConnetDB(MONGO_URI)

// and start server;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});