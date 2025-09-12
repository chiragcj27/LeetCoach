import express from 'express';
import cors from 'cors';
import openaiProxyRoute from './routes/openai';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/openai-proxy', openaiProxyRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 