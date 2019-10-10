import mongoose from 'mongoose';

const { Schema } = mongoose;

const QuoteSchema = Schema({
  id: Schema.Types.ObjectId,
  quote: String,
  image: String,
});

export default mongoose.model('Quote', QuoteSchema);
