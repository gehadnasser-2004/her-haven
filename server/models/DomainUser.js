import mongoose from "mongoose";

const CalendarEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ReminderSchema = new mongoose.Schema(
  {
    frequency: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    time: { type: String },
    active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ScanSchema = new mongoose.Schema(
  {
    scan_img: { type: String, required: true },
    upload_date: { type: Date, default: Date.now },
    analysis_status: { type: String, default: "pending" },
    result: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false }
);

const DomainUserSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    num_preg: { type: Number },
    num_children: { type: Number },
    settings: { type: mongoose.Schema.Types.Mixed },
    calendar: [CalendarEventSchema],
    reminders: [ReminderSchema],
    scans: [ScanSchema],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

DomainUserSchema.index({ account: 1 }, { unique: true });

export default mongoose.model("DomainUser", DomainUserSchema);
