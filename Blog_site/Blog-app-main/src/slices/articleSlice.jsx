import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticleById = createAsyncThunk(
  "articleSlice/fetchArticleById",
  async (articleId) => {
    try {
      const response = await fetch(`http://localhost:8000/blogs/${articleId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log("these are the single articles from the frontend---->", data);

      // Return the articles array inside the "data" property
      return data.data;
    } catch (error) {
      console.error("Error fetching article by ID:", error);
      throw error;
    }
  }
);

export const articleSlice = createSlice({
  name: "articleSlice",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default articleSlice.reducer;
