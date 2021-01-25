import mongoose, { Schema } from 'mongoose';

const MODEL_NAME = 'Fighter';

const schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'fighters');
