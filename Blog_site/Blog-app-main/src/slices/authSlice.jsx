import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  try {
    const response = await fetch("http://localhost:8000/auth/user", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("User not authenticated");
    }

    const user = await response.json();
    console.log("this is the user from frontend ->", user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user";
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
