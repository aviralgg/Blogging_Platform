import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 30
    },
    content: {
      type: String,
      minlength: 8
    },
    category: {
      type: String,
      required: true
    },
    tags: {
      type: String,
      enum: ["Tech", "Programming"],
      default: "Tech"
    }
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
