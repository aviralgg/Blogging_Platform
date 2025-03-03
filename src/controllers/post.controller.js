import { Post } from "../models/posts.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, tags } = req.body;
  if (!title || !category) {
    throw new ApiError(400, "title or category missing");
  }

  const post = await Post.create({
    title,
    content,
    category,
    tags,
  });

  if (!post) {
    throw new ApiError(500, "Something went wrong while creating post");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

const updatePost = asyncHandler(async (req, res) => {
  const { content, category } = req.body;
  const postID = req.params._id;
  if (!content && !category) {
    throw new ApiError(400, "content and category are missing");
  }
  const post = await Post.findByIdAndUpdate(
    postID,
    {
      $set: {
        ...(content && { content }),
        ...(category && { category }),
      },
    },
    { new: true }
  );
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const postID = req.params._id;
  if (!mongoose.Types.ObjectId.isValid(postID)) {
    throw new ApiError(400, "Invalid post ID format");
  }
  if (!postID) {
    throw new ApiError(400, "ID required");
  }
  const post = await Post.findByIdAndDelete(postID);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});


export { createPost, updatePost, deletePost };
