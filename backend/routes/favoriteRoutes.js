// favoriteRoutes.js (backend)

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import User from '../models/userModel.js';

const favoriteRouter = express.Router();

favoriteRouter.get(
  '/:userId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.params.userId;

      // Find the user by ID and populate the 'favorites' field with design details
      const user = await User.findById(userId).populate();

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ favorites: user.favorites });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  })
);

favoriteRouter.post(
  '/:userId',
  expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.params.userId;
      const favoriteToAdd = req.body.favorite;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.favorites.push(favoriteToAdd);
      await user.save
      res.status(200).json({ message: 'Favorite added successfully' });
    } catch (error) {}
  })
);

export default favoriteRouter;
