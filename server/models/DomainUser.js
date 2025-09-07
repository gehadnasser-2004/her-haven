import mongoose from "mongoose";

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
    calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: "CalendarEvent" }],
    reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reminder" }],
    scans: [ScanSchema],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

DomainUserSchema.index({ account: 1 }, { unique: true });

export default mongoose.model("DomainUser", DomainUserSchema);
