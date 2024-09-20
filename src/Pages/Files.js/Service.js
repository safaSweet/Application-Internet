import axios from "axios";
import {
  url,
  createFile,
  getFile,
  chickIn,
  chickOut,
  downloadFile,
  deleteFile,
} from "../endPoint";
import Cookies from "cookie-universal";

const cookies = Cookies();
const token = cookies.get("token");

export const GET_FILES = async (id) => {
  // const cookies = Cookies();
  // const token = cookies.get("token");
  return await axios
    .post(
      `${url}/${getFile}`,
      { repo_id: id },
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    // .then((e) => setState(e.data.data.files));
    .then((e) => e.data.data.files);
};

export const CREATE_FILE = async (formData) => {
  // const cookies = Cookies();
  // const token = cookies.get("token");
   await axios.post(`${url}/${createFile}`, formData, {
    headers: { Authorization: "Bearer " + token },
  });
    window.location.reload();
};

export const CHICK_IN = async (id, file_id) => {

  try {
    return await axios.post(
      `${url}/${chickIn}`,
      { repo_id: id, file_id },
      {
        headers: { Authorization: "Bearer " + token },
      }

    );
   
  } catch (e) {
    alert("choose the files free just free");
  }
};
export const CHICK_OUT = async (id, file_id) => {
  // const cookies = Cookies();
  // const token = cookies.get("token");
  try {
    return await axios.post(
      `${url}/${chickOut}`,
      { repo_id: id, file_id },
      {
        headers: { Authorization: "Bearer " + token },
      }
      );
      window.location.reload();
  } catch (e) {
    alert("choose the files free just block");
  }
};
export const DOWNLOAD_FILE = async (id) => {
  try {
    await axios
      .post(
        `${url}/${downloadFile}`,
        { file_id: id },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((e) => e.data.content);
  } catch (err) {}
};
export const DELETE_FILE = async (id) => {
  const confirmDelete = window.confirm(
    `${id} هل أنت متأكد من أنك تريد حذف هذا العنصر؟`
  );
  if (confirmDelete) {
  await axios.post(
    `${url}/${deleteFile}`,
    { file_id: id },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  window.location.reload();}
  else{ alert("تم رفض الإجراء.");}
};
