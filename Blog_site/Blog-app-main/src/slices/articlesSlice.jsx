import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch articles
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    try {
      const response = await fetch("http://localhost:8000/blogs/", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log("these are the articles from the frontend---->", data);

      // Return the articles array inside the "data" property
      return data.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  }
);

// Articles slice
export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [], // Stores the array of articles
    isLoading: false, // Loading state
    error: null, // Error state
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
        state.articles = action.payload; // Assign the articles array
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Capture any errors
      });
  },
});

export default articlesSlice.reducer;
