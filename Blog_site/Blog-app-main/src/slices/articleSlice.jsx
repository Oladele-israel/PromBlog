import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticleById = createAsyncThunk(
  "articleSlice/fetchArticleById",
  async (articleId) => {
    try {
      const response = await fetch(
        `https://promblog.onrender.com/blogs/${articleId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

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
