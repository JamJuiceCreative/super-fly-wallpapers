import express from 'express';
import Design from '../models/designModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Design.deleteMany({});
  const createdDesigns = await Design.insertMany(data.designs);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdDesigns, createdUsers });
});
export default seedRouter;
