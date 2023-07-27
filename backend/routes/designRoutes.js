import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Design from '../models/designModel.js';
import { isAuth, isAdmin } from '../utils.js';

const designRouter = express.Router();

designRouter.get('/', async (req, res) => {
  const designs = await Design.find();
  res.send(designs);
});

designRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newDesign = new Design({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      image: 'images/rubber-ducks.png',
      price: 0,
      category: 'sample category',
      style: 'sample style',
      printToOrder: true,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const design = await newDesign.save();
    res.send({ message: 'Design Created', design });
  })
);

designRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const designId = req.params.id;
    const design = await Design.findById(designId);
    if (design) {
      design.name = req.body.name;
      design.slug = req.body.slug;
      design.price = req.body.price;
      design.image = req.body.image;
      design.category = req.body.category;
      design.style = req.body.style;
      design.printToOrder = req.body.printToOrder;
      design.description = req.body.description;
      await design.save();
      res.send({ message: 'Design Updated' });
    } else {
      res.status(404).send({ message: 'Design Not Found' });
    }
  })
);

const PAGE_SIZE = 3;

designRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const designs = await Design.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countDesigns = await Design.countDocuments();
    res.send({
      designs,
      countDesigns,
      page,
      pages: Math.ceil(countDesigns / pageSize),
    });
  })
);

designRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
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
