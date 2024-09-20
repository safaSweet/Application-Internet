import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN } from "./Service";

export const addUser = createAsyncThunk("Auth/addUser", async (userData) => {
  return await LOGIN(userData);
});
export const Slice = createSlice({
  name: "Auth",
  initialState: {
    userData: {},
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { addUserData, startUser, successUser, errorUser } = Slice.actions;
export default Slice.reducer;
