import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

app.get('/api/designs/slug/:slug', (req, res) => {
  const design = data.designs.find((x) => x.slug === req.params.slug);
  if (design) {
    res.send(design);
  } else {
    res.status(404).send({ message: 'Design Not Found' });
  }
});
app.get('/api/designs/:id', (req, res) => {
  const design = data.designs.find((x) => x._id === req.params.id);
  if (design) {
    res.send(design);
  } else {
    res.status(404).send({ message: 'Design Not Found' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
