import express from 'express';
import Design from '../models/designModel.js';

const designRouter = express.Router();

designRouter.get('/', async (req, res) => {
  const designs = await Design.find();
  res.send(designs);
});

designRouter.get('/slug/:slug', async (req, res) => {
  const design = await Design.findOne({ slug: req.params.slug });
  if (design) {
    res.send(design);
  } else {
    res.status(404).send({ message: 'Design Not Found' });
  }
});
designRouter.get('/:id', async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (design) {
    res.send(design);
  } else {
    res.status(404).send({ message: 'Design Not Found' });
  }
});

export default designRouter;
