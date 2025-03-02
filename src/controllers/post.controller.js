import { Post } from "../models/posts.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
    .json(new ApiResponse(200, post, "Post created successfully"));
});

export { createPost };
