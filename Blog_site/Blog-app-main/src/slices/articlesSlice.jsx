import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk(
  "articlesSlice/fetchArticles",
  async () => {
    try {
      const response = await fetch(
        "https://api.npoint.io/df1918b475de71952ad7"
      );
      const articles = await response.json();
      return articles;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
);

export const articlesSlice = createSlice({
  name: "articlesSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default articlesSlice.reducer;
