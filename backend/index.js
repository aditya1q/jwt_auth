import express from 'express'
import { ConnetDB } from './config/db_config.js';
import { MONGO_URI, PORT } from './config/env_config.js';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middleware/cors_middleware.js';
import authRoute from './routes/auth_route.js';
import { errorhandler } from './middleware/errorhandler_middleware.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(corsMiddleware);

// Routes
app.use('/api', authRoute);

// Error-Handler Middleware
app.use(errorhandler);

// Connect to DB
ConnetDB(MONGO_URI)

// and start server;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});