import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_FILE, CHICK_IN, CHICK_OUT } from "./Service";
import { url, getFile, downloadFile } from "../endPoint";
import axios from "axios";
import Cookies from "cookie-universal";
import atob from "atob";
import { saveAs } from "file-saver";

const cookies = Cookies();
const token = cookies.get("token");

export const chick_in = createAsyncThunk(
  "Files/chick_in",
  async (id, file_id) => {
    const response = await CHICK_IN(id, file_id);
    return response;
  }
);

export const chick_out = createAsyncThunk(
  "Files/chick_out",
  async (id, file_id) => {
    const response = await CHICK_OUT(id, file_id);
    return response;
  }
);

export const Get_Files = createAsyncThunk("Files/Get_Files", async (id) => {
  return await axios
    .post(
      `${url}/${getFile}`,
      { repo_id: id },
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((e) => e.data.data.files);
});

export const createFile = createAsyncThunk("Files/CreateFile", CREATE_FILE);
export const SliceFile = createSlice({
  name: "Files",
  initialState: {
    data: [],
    download: "",
    decryptedDa: "",
    is_admin:0,
    status: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      // .addCase(download_file.fulfilled, (state, action) => {
      //   state.decryptedDa = action.payload; // تحديث الحالة بالبيانات المفكوكة
      // })
      .addCase(Get_Files.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Get_Files.fulfilled, (state, action) => {
        state.data = action.payload;
        state.download = action.payload;
        state.loading = false;
      })
      .addCase(Get_Files.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});
export const download_file = createAsyncThunk(
  "Files/download_file",
  async (id) => {
    const response = await axios.post(
      `${url}/${downloadFile}`,
      { file_id: id },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    // .then((response)=>response.data.content)

    const encryptedData = response.data.content;
    const decryptedDa = atob(encryptedData);
    // إنشاء كائن Blob لتخزين المحتوى بعد فك التشفير
    const blob = new Blob([decryptedDa], {
      type: "text/plain;charset=utf-8",
    });

    // حفظ الملف
    saveAs(blob, `${response.data.name}`);
  }
);

export const { addUserData, startUser, successUser, errorUser } =
  SliceFile.actions;

export default SliceFile.reducer;
