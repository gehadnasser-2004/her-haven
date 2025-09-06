import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    contact_info: {
      type: new mongoose.Schema(
        {
          phone: { type: String },
          email: { type: String },
        },
        { _id: false }
      ),
      required: true,
    },
    location: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

DoctorSchema.index({ location: 1 });
DoctorSchema.index({ specialty: 1 });

export default mongoose.model("Doctor", DoctorSchema);
