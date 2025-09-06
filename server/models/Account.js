import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verificationToken: String,
    isVerified: { type: Boolean, default: false },
    verified: Date,
    passwordToken: String,
    passwordTokenExpirationDate: Date,
  },
  { timestamps: true }
);

// Ensure a unique index on email (enforced at DB level)
AccountSchema.index({ email: 1 }, { unique: true });

AccountSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AccountSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hide sensitive fields when converting to JSON/Objects
const hideSensitive = (doc, ret) => {
  delete ret.password;
  delete ret.__v;
  return ret;
};
AccountSchema.set("toJSON", { transform: hideSensitive });
AccountSchema.set("toObject", { transform: hideSensitive });

export default mongoose.model("Account", AccountSchema);
