import React, { useEffect } from "react";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { download_file } from "../Pages/Files.js/Slice_File";

export default function Downlod({ data }) {
  const dispatch = useDispatch();

  const download = async (id) => {
    try {
      dispatch(download_file(id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <BsFillCloudDownloadFill
        onClick={() => download(data)}
        style={{
          color: "cadetblue",
          cursor: "pointer",
        }}
      />
    </>
  );
}
