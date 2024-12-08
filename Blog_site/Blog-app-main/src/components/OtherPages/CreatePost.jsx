import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Header/Logo";
import styles from "./ArticleDetails.module.css";
import FooterTop from "../Footer/FooterTop";
import FooterBottom from "../Footer/FooterBottom";
import ArrowToTop from "./ArrowToTop";

const CreatePost = () => {
  const [title, setTitle] = useState(""); // State for the blog title
  const [sections, setSections] = useState([{ title: "", body: "" }]);
  const [readingTime, setReadingTime] = useState("");
  const [category, setCategory] = useState("Technology");
  const [tags, setTags] = useState("");

  const addSection = () => {
    setSections([...sections, { title: "", body: "" }]);
  };

  const removeSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const featuredImageFile = e.target.featuredImage.files[0];

    // Function to convert file to Base64
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    try {
      const featuredImageBase64 = featuredImageFile
        ? await convertToBase64(featuredImageFile)
        : null;

      const postData = {
        title, // Include the blog title in the payload
        featuredImage: featuredImageBase64,
        content: sections,
        category,
        readingTime,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : undefined, // Convert tags to array
      };

      console.log(postData);

      const response = await fetch("http://localhost:8000/blogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Post created successfully:", result);
      } else {
        console.error("Failed to create post:", result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div
      className={`min-h-screen text-black justify-center flex flex-col ml-3 py-8`}
    >
      <Link to="/" className={`${styles.logo} mb-10`}>
        <Logo />
      </Link>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-0">
        Create New Post
      </h1>
      <p className="text-lg text-center p-2 mb-6">
        Create and share amazing articles with the world. Let your imagination
        run wild!
      </p>
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-lg shadow-lg w-full max-w-3xl md:self-center"
      >
        {/* Blog Title */}
        <div className="mb-4">
          <label htmlFor="blogTitle" className="block font-semibold mb-2">
            Blog Title
          </label>
          <input
            type="text"
            id="blogTitle"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter the title of your blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Featured Image */}
        <div className="mb-4">
          <label htmlFor="featuredImage" className="block font-semibold mb-2">
            Featured Image
          </label>
          <input
            type="file"
            id="featuredImage"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            className="w-full border border-gray-300 rounded-md p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Sections */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Sections</h2>
          {sections.map((section, index) => (
            <div
              key={index}
              className="p-4 rounded-md mb-4 border border-gray-300"
            >
              <div className="mb-2">
                <label
                  htmlFor={`title-${index}`}
                  className="block font-semibold mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id={`title-${index}`}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter section title"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(index, "title", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`body-${index}`}
                  className="block font-semibold mb-1"
                >
                  Content
                </label>
                <textarea
                  id={`body-${index}`}
                  className="w-full border border-gray-300 rounded-md p-2 h-24"
                  placeholder="Enter section content"
                  value={section.body}
                  onChange={(e) =>
                    handleSectionChange(index, "body", e.target.value)
                  }
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="text-red-500 mt-2 font-semibold hover:underline"
              >
                Remove Section
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="text-black border border-gray-300 rounded-md px-4 py-2 mt-2 hover:bg-gray-100 transition"
          >
            Add Another Section
          </button>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block font-semibold mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., #webdev, #AI, #Tech"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Reading Time */}
        <div className="mb-4">
          <label htmlFor="readingTime" className="block font-semibold mb-2">
            Reading Time (in minutes)
          </label>
          <input
            type="number"
            id="readingTime"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., 5"
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white border border-gray-300 rounded-md py-2 font-semibold bg-black hover:bg-gray-800 transition"
        >
          Publish Post
        </button>
      </form>

      <div className={`${styles.footer} mt-20`}>
        <FooterTop />
        <FooterBottom />
      </div>
      <ArrowToTop />
    </div>
  );
};

export default CreatePost;
