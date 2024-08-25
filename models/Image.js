import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer, // Store image as a binary buffer
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
