import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
