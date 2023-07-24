import mongoose from 'mongoose';

const designSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    printToOrder: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  { timestamps: true }
);

const Design = mongoose.model('Design', designSchema);

export default Design;
