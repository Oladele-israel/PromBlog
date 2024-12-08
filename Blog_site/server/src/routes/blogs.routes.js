import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} from "../controllers/blog.controllers.js";
import { checkLoggedIn } from "../middlewares/auth.middleware.js";
import express from "express";

const blogRouter = express.Router();

blogRouter.post("/", checkLoggedIn, createPost);
blogRouter.get("/", checkLoggedIn, getAllPosts);
blogRouter.patch("/:id", checkLoggedIn, updatePost);
blogRouter.delete("/:id", checkLoggedIn, deletePost);

export default blogRouter;
