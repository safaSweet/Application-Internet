import { createSlice } from "@reduxjs/toolkit";

const decryptedDataSlice = createSlice({
  name: "decryptedData",
  initialState: "",
  reducers: {
    setDecryptedData: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setDecryptedData } = decryptedDataSlice.actions;
export default decryptedDataSlice.reducer;
