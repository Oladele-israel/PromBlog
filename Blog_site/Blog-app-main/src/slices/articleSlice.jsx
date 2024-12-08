import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticleById = createAsyncThunk(
    'articleSlice/fetchArticleById',
    async (articleId) => {
        try {
            const adjustedId = articleId - 1;

            const response = await fetch(`https://api.npoint.io/df1918b475de71952ad7/${adjustedId}`);
            const article = await response.json();
            return article;
        } catch (error) {
            console.error('Error fetching article by ID:', error);
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
    }
});

export default articleSlice.reducer;
