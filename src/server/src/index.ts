import express, { Request, Response } from 'express';
import videoRoutes from './routes/videoRoutes';

const app = express();

app.use(express.json());

app.use('/api', videoRoutes);

app.listen('3001', (err: Error) => {
  if (err) {
    throw err;
  }

  console.log(`Server is listening on http://localhost:3001`);
});