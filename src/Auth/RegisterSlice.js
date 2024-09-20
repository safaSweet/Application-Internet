// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { REGISTER } from "./Service";
// import { useDispatch } from "react-redux";

// export const register = createAsyncThunk("Register/register", async (data) => {
//   const dispatch=useDispatch();
//   dispatch(data);
//   return await REGISTER(data);
// });
// export const SliceRegister = createSlice({
//   name: "Register",
//   initialState: {
//     User_Data: {
//         name:register.data
//     },
//     loading: false,
//     error: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//       })
//     //   .addCase(register.fulfilled, (state, action) => {
//     //     state.User_Data = action.payload;
//     //     state.loading = false;
//     //   })
//       .addCase(register.rejected, (state) => {
//         state.loading = false;
//         state.error = true;
//       });
//   },
// });
// export const { registerData, startUser, successUser, errorUser } = SliceRegister.actions;
// export default SliceRegister.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REGISTER } from "./Service";
import { useDispatch } from "react-redux";

export const register = createAsyncThunk("Register/register", async (data) => {
  return await REGISTER(data);
});

export const SliceRegister = createSlice({
  name: "Register",
  initialState: {
    User_Data: {},
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.User_Data = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { registerData, startUser, successUser, errorUser } = SliceRegister.actions;
export default SliceRegister.reducer;
