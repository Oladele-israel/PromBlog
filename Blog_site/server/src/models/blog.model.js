import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please enter the title of your post"],
    },

    featuredImage: {
      type: String,
      required: true,
    },
    content: [
      {
        title: {
          type: String,
          trim: true,
          required: [true, "Please enter the section title"],
        },
        body: {
          type: String,
          trim: true,
          required: [true, "Please enter the section content"],
        },
      },
    ],
    tags: {
      type: [String],
      default: ["#webdev, #Ai, #Tech_Job_market"],
    },
    category: {
      type: String,
      enum: ["Technology", "Health", "Lifestyle", "Education", "Other"],
      required: [true, "please enter a valid category"],
    },
    readingTime: {
      type: String,
      required: [true, "enter the estimated reading time"],
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featuredImage: {
      type: String,
    },
    featuredImageId: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
