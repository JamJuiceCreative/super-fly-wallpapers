// favoriteRoutes.js (backend)
import mongoose from 'mongoose';
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

      console.log('User ID:', userId);
      console.log('Favorite to add:', favoriteToAdd);
      console.log('Type of favoriteToAdd:', typeof favoriteToAdd);

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.favorites.push(favoriteToAdd);
      await user.save();
      return res.status(200).json({ message: 'Favorite added successfully' });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
);








// Remove a design ID from favorites
favoriteRouter.delete(
  '/remove/:userId',
  expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.params.userId;
      const favoriteToRemove = req.body.favorite;

      console.log('Favorite to remove:', favoriteToRemove);
      console.log('Type of favoriteToRemove:', typeof favoriteToRemove);

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.favorites) {
        user.favorites = user.favorites.filter((favorite) => favorite !== favoriteToRemove);
        await user.save();
        return res.status(200).json({ message: 'Favorite removed successfully' });
      } else {
        return res.status(400).json({ message: 'User has no favorites' });
      }
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
);


export default favoriteRouter;
