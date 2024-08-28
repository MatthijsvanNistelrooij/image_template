import mongoose from "mongoose"

const ImageSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clerkId: {
    type: String, 
    required: true,
  },
  views: {
    type: Number, 
    required: true,
  },
})

export default mongoose.models.Image || mongoose.model("Image", ImageSchema)
