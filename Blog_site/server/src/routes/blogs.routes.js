import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
} from "../controllers/blog.controllers.js";
import { checkLoggedIn } from "../middlewares/auth.middleware.js";
import express from "express";

const blogRouter = express.Router();

blogRouter.post("/", checkLoggedIn, createPost);
blogRouter.get("/", getAllPosts);
blogRouter.get("/:id", getPostById);
blogRouter.patch("/:id", checkLoggedIn, updatePost);
blogRouter.delete("/:id", checkLoggedIn, deletePost);

export default blogRouter;
