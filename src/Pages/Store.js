import Slice from "../Auth/UserSlice";
import SliceRepo from "./Folder/Slice_Repo";
import  SliceFile  from "./Files.js/Slice_File";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import SliceUser from "./Users/SliceUser";
import  SliceRegister  from "../Auth/RegisterSlice";

const store = configureStore({
  reducer: {
    Auth: Slice,
    Repo: SliceRepo,
    Files:SliceFile,
    User:SliceUser,
    Register:SliceRegister
  },
  middleware: [...getDefaultMiddleware(), /* وسائط أخرى */],
});
export default store;
