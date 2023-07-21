import express from 'express';
import data from './data.js';

const app = express();
app.get('/api/designs', (req, res) => {
  res.send(data.designs);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
