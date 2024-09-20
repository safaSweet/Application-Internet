import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_REPO } from "./Service";
import axios from "axios";
import Cookies from "cookie-universal";
import { url, getRepo } from "../endPoint";
const cookies = Cookies();
const token = cookies.get("token");
export const createRepo = createAsyncThunk("Repo/CreateRepo", CREATE_REPO);
export const SliceRepo = createSlice({
  name: "Repo",
  initialState: {
    data: [],
    is_admin: 0,
    status: null,
    loading: false,
    error: null,
    current_page: 1,
    totalPages: 1,
    last_page: 2,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(Rep.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Rep.fulfilled, (state, action) => {
        state.data = action.payload;
        state.is_admin = action.payload;//.is_admin;
        state.loading = false;
      })
      .addCase(Rep.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});
const fetchData=async(current_page)=>{
  try {
    const response = await axios.get(`${url}/${getRepo}?page=${current_page}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
export const Rep = createAsyncThunk("Repo/Rep", async (current_page, { getState }) => {
  const data = await fetchData(current_page);
  return data
 
});
export const { addUserData, startUser, successUser, errorUser } =
  SliceRepo.actions;
export default SliceRepo.reducer;
