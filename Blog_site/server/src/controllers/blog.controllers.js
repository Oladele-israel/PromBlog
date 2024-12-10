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
      author: loggedInUser,
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

// get post by id
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Blog.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post retrieved successfully.",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the post.",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      tags,
      category,
      readingTime,
      isPublished,
      featuredImage,
    } = req.body;

    // Find the post
    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    // Check if the user is authorized to update the post
    if (req.user.id !== post.author.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post.",
      });
    }

    const updates = {};

    // Validate and update the title
    if (title) {
      validateString(title, 5, "Title");
      updates.title = title.trim();
    }

    // Validate and update the content
    if (content) {
      if (!Array.isArray(content)) {
        return res.status(400).json({
          success: false,
          message: "Content must be an array of objects.",
        });
      }
      content.forEach((section, index) => {
        validateString(section.title, 5, `Section ${index + 1} title`);
        validateString(section.body, 10, `Section ${index + 1} body`);
      });
      updates.content = content;
    }

    // Validate and update the category
    if (category) {
      validateString(category, 3, "Category");
      updates.category = category.trim();
    }

    // Validate and update the tags
    if (tags) {
      validateTags(tags);
      updates.tags = tags.map((tag) => tag.trim());
    }

    // Update the reading time
    if (readingTime) {
      updates.readingTime = readingTime;
    }

    // Update publication status and timestamp
    if (isPublished !== undefined) {
      updates.isPublished = isPublished;
      if (isPublished) {
        updates.publishedAt = Date.now();
      }
    }

    // Handle featured image update
    if (featuredImage) {
      // Delete the old featured image from Cloudinary
      if (post.featuredImageId) {
        await cloudinary.uploader.destroy(post.featuredImageId);
      }

      // Upload the new featured image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(
        featuredImage,
        {
          folder: process.env.CLOUDINARY_FOLDER || "/sample1",
        }
      );

      if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        throw new Error("Failed to upload the new featured image.");
      }

      updates.featuredImage = cloudinaryResponse.secure_url;
      updates.featuredImageId = cloudinaryResponse.public_id;
    }

    // Apply the updates
    const updatedPost = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      data: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
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
  getPostById,
};
