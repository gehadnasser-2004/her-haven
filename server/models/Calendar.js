import mongoose from "mongoose";

const CalendarEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide event title"],
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    date: {
      type: Date,
      required: [true, "Please provide event date"],
    },
    time: {
      type: String,
    },
    type: {
      type: String,
      enum: ["appointment", "milestone", "reminder"],
      default: "appointment",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CalendarEvent", CalendarEventSchema);
