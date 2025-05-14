import express from 'express';
import mocksRouter from './routes/mocks.router.js';

const app = express();

app.use(express.json());
app.use('/api/mocks', mocksRouter);

export default app;
