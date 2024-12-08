import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { validateString, validateTags } from "../Helpers/index.js";
import cloudinary from "../config/cloudinary.js";

const createPost = async (req, res) => {
  try {
    const loggedInUser = req.user?.id;

    if (!loggedInUser) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in to create a post.",
      });
    }

    const { title, content, tags, category, readingTime, featuredImage } =
      req.body;

    if (
      !title ||
      !content ||
      !tags ||
      !category ||
      !readingTime ||
      !featuredImage
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (title, content, tags, category, readingTime) are required.",
      });
    }

    validateString(title, 5, "Title");

    if (!Array.isArray(content)) {
      return res.status(400).json({
        success: false,
        message: "Content must be an array of objects.",
      });
    }

    content.forEach((section, index) => {
      const { title: sectionTitle, body } = section;
      if (!sectionTitle || !body) {
        throw new Error(
          `Section ${index + 1} must include both 'title' and 'body'.`
        );
      }
      validateString(sectionTitle, 5, `Section ${index + 1} title`);
      validateString(body, 10, `Section ${index + 1} body`);
    });

    validateString(category, 3, "Category");
    validateTags(tags);

    const trimmedTags = tags.map((tag) => tag.trim());

    //featured article image

    const cloudinaryResponse = await cloudinary.uploader.upload(featuredImage, {
      folder: process.env.CLOUDINARY_FOLDER || "/sample1",
    });

    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
      throw new Error("Failed to upload featured image.");
    }

    const { secure_url: imageUrl, public_id: imagePublicId } =
      cloudinaryResponse;

    const newBlog = await Blog.create({
      title: title.trim(),
      content,
      tags: trimmedTags,
      category: category.trim(),
      isPublished: true,
      readingTime,
      publishedAt: Date.now(),
      featuredImage: imageUrl,
      featuredImageId: imagePublicId,
    });

    await User.findByIdAndUpdate(loggedInUser, {
      $push: { articles: newBlog._id },
    });

    return res.status(201).json({
      success: true,
      message: "Your post has been published successfully.",
      data: newBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An unexpected error occurred.",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Blog.find({});

    if (!allPosts || allPosts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully.",
      data: allPosts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving posts.",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, category, readingTime, isPublished } =
      req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required.",
      });
    }

    const existingPost = await Blog.findById(id);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (title) validateString(title, 5, "Title");
    if (content) {
      if (!Array.isArray(content)) {
        return res.status(400).json({
          success: false,
          message: "Content must be an array of objects.",
        });
      }
      content.forEach((section, index) => {
        const { title: sectionTitle, body } = section;
        if (!sectionTitle || !body) {
          throw new Error(
            `Section ${index + 1} must include both 'title' and 'body'.`
          );
        }
        validateString(sectionTitle, 5, `Section ${index + 1} title`);
        validateString(body, 10, `Section ${index + 1} body`);
      });
    }
    if (category) validateString(category, 3, "Category");
    if (tags) validateTags(tags);

    const updatedTags = tags ? tags.map((tag) => tag.trim()) : undefined;

    const updatedPost = await Blog.findByIdAndUpdate(
      id,
      {
        ...(title && { title: title.trim() }),
        ...(content && { content }),
        ...(tags && { tags: updatedTags }),
        ...(category && { category: category.trim() }),
        ...(readingTime && { readingTime }),
        ...(isPublished !== undefined && { isPublished }),
        ...(isPublished && { publishedAt: new Date() }),
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      data: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "An unexpected error occurred.",
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const blogPost = Blog.findByIdAndDelete(id);

    if (!blogPost) {
      res.status(404).json({
        message: "post not found",
      });
    }

    return res.status(204).json({
      success: true,
      message: "post deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const likeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { likes: 1 } },
      { new: true } // Return the updated document
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blog liked successfully", likes: blog.likes });
  } catch (error) {
    res.status(500).json({ message: "Error liking blog", error });
  }
};

const unlikeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.likes > 0) {
      blog.likes -= 1;
      await blog.save();
    }

    res
      .status(200)
      .json({ message: "Blog unliked successfully", likes: blog.likes });
  } catch (error) {
    res.status(500).json({ message: "Error unliking blog", error });
  }
};

export {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  likeBlog,
  unlikeBlog,
};
