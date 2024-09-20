import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { url, getUser } from "../endPoint";
// import axios from "axios";
// import Cookies from "cookie-universal";
import { AddUserToRepo } from "./Service";
import {  GET_USER_REPO } from "../Folder/Service";
// const cookies = Cookies();
// const token = cookies.get("token");
export const AddUser=createAsyncThunk('user/AddUser',async(dataUser)=>{
  return await AddUserToRepo(dataUser);
})
// export const GetUser = createAsyncThunk("user/GetUser", async () => {
//   return await Get_User();
// });
export const GetUser = createAsyncThunk("user/GetUser", (id)=>{
  return  GET_USER_REPO(id);
});
export const SliceUser = createSlice({
  name: "user",
  initialState: {
    data: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GetUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { addUserData, startUser, successUser, errorUser } =
  SliceUser.actions;
export default SliceUser.reducer;
