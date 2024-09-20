import axios from "axios";
import { url, getUser } from "../endPoint";
import Cookie from "cookie-universal";

const cookies = Cookie();
const token = cookies.get("token");
export const AddUserToRepo=async(data)=>{

    await axios.post(
        `http://127.0.0.1:8000/api/repo/add-delete-user-to-repo`,
        data,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      window.location.reload();
}
export const Get_User=async()=>{
  await  axios
    .get(`${url}/${getUser}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((e) => e.data.data);
}