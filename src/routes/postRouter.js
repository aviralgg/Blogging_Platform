import { Router } from "express";
import { createPost, deletePost, updatePost } from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/update/:_id").patch(updatePost);
router.route("/delete/:_id").delete(deletePost);

export default router;
