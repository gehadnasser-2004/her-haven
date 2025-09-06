import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: { type: String, required: true },
    ip: String,
    userAgent: String,
    isValid: { type: Boolean, default: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", TokenSchema);
