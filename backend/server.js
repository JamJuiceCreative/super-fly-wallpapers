import express from 'express';
import data from './data.js';
import cors from 'cors';

const app = express();

// Configure CORS to allow requests from your frontend domain
const corsOptions = {
  origin: 'http://localhost:5173',
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

app.get('/api/designs', (req, res) => {
  res.send(data.designs);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
