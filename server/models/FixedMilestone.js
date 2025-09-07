import mongoose from "mongoose";

const FixedMilestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    relative_week: { type: Number },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("FixedMilestone", FixedMilestoneSchema);
