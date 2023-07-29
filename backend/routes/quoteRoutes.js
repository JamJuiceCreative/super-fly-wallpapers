import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Quote from '../models/quoteModel.js';
import { isAuth } from '../utils.js';

const quoteRouter = express.Router();

// Route to save the quote
quoteRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { quoteItems, squareMeters, quotePrice } = req.body;
    const quote = new Quote({
      quoteItems,
      squareMeters,
      quotePrice,
      user: req.user._id,
    });

    const savedQuote = await quote.save();
    res
      .status(201)
      .send({ message: 'Quote saved successfully!', quote: savedQuote });
  })
);

// Route to fetch all quotes
quoteRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const quotes = await Quote.find({ user: req.user._id }).populate(
      'quoteItems.design'
    );
    res.send(quotes);
  })
);

export default quoteRouter;
