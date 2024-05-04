import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user need to provide Full Name"],
    },
    username: {
      type: String,
      required: [true, "A user need to provide username"],
    },
    studentLRN: {
      type: String,
      required: [true, "A user need to provide studentLRN"],
    },
    schoolName: {
      type: String,
      required: [true, "A user need to provide schoolName"],
    },
    password: {
      type: String,
      required: [true, "A user need to provide password"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "A user need to confirm password"],
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: Date,
    passwordResetToken: Date,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() * 1000;
  next();
});

userSchema.pre("save", async function (next) {
  try {
    // Only run this function if password is modified..
    if (!this.isModified("password")) return next();

    // Hash the password with coast of 12
    let salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
