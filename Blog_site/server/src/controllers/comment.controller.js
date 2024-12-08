import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;

    const comment = await Comment.create({
      blog: blogId,
      user: req.user._id,
      content,
    });

    await Blog.findByIdAndUpdate(blogId, {
      $push: { comments: comment._id },
    });

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

const getBlogWithComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate({
      path: "comments",
      populate: { path: "user", select: "name" },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);
    await Blog.findByIdAndUpdate(comment.blog, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export { getBlogWithComments, deleteComment, addComment };
