import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    try {
      const response = await fetch("https://promblog-1.onrender.com/blogs/", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      return data.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;
