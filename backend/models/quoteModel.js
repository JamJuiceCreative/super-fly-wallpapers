import mongoose from 'mongoose';


const quoteSchema = new mongoose.Schema(
  {
    quoteItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        design: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Design',
          required: true,
        },
      },
    ],

    squareMeters: { type: Number, required: true },
    quotePrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);
const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;
