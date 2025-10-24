import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    bio: { type: String },
  },
  { timestamps: true }
);

// ✅ Fix: use existing model if already compiled
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
