import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notsRouter from './router/notsRouter';
import router from './router/Authrouter';
import googleRouter from './router/googleAuth';

// Load environment variables
dotenv.config();

const app = express();
const Port = process.env.PORT || 3000; // Fallback port if not set

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5175', // Allow only this origin
  credentials: true,              // Allow credentials (cookies, headers)
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Apply CORS with the defined options

// Routes
app.use('/user', router);
app.use('/posts', notsRouter);
app.use('/auth', googleRouter);
// Start the server
app.listen(Port, () => {
  console.log(`Server started at http://localhost:${Port}`);
});
