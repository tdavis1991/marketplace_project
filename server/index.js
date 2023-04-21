import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();

const app = express();
// middleware allows browsers to enforce the same-origin policy
app.use(cors());

// Controls the maximum request body size.
app.use(express.json({ limit: '50mb' }));


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' })
})