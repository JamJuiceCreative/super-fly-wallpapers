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

// designRouter.get('/', async (req, res) => {
//   const designs = await Design.find();
//   res.send(designs);
// });



// Route to fetch Quote by ID
quoteRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const quote = await Quote.findById(req.params.id).populate('quoteItems.design');
    if (quote) {
      res.send(quote);
    } else {
      res.status(404).send({ message: 'Quote not found' });
    }
  })
);

quoteRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const quoteId = req.params.id;
    const quote = await Quote.findById(quoteId);
    
    if (quote) {
      // Delete the quote from the database
      await quote.deleteOne();
      res.send({ message: 'Quote deleted successfully' });
    } else {
      res.status(404).send({ message: 'Quote not found' });
    }
  })
);

export default quoteRouter;