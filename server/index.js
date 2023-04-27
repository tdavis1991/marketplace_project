import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import itemRouter from './routes/item.routes.js';

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

app.use('/api/v1/users', userRouter);
app.use('/api/v1/items', itemRouter);

//server for mongodb
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () => console.log('Server started on port https://localhost:8080'))
  } catch(error) {
    console.log(error)
  }
}

startServer();