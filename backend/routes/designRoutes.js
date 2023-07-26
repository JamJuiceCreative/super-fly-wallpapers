import express from 'express';
import Design from '../models/designModel.js';
import expressAsyncHandler from 'express-async-handler';

const designRouter = express.Router();
designRouter.get('/', async (req, res) => {
  const designs = await Design.find();
  res.send(designs);
});
const PAGE_SIZE = 3;

designRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const style = query.brand || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';
    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };
    const designs = await Design.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countDesigns = await Design.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    res.send({
      designs,
      countDesigns,
      page,
      pages: Math.ceil(countDesigns / pageSize),
    });
  })
);

designRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Design.find().distinct('category');
    res.send(categories);
  })
);

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
