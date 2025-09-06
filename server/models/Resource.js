import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    description: { type: String },
    url: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

ResourceSchema.index({ genre: 1 });
ResourceSchema.index({ type: 1 });

export default mongoose.model("Resource", ResourceSchema);
