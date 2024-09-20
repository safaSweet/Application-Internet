import axios from "axios";
import Cookies from "cookie-universal";
import { url, getRepo, deleteRepo, create_Repo, getReport ,getUserRepo} from "../endPoint";

const cookies = Cookies();
const token = cookies.get("token");
export async function GET_REPO() {
  return await axios
    .get(`http://127.0.0.1:8000/api/repo/get-repository?page=12`, {//${url}/${getRepo}?page=12
      headers: { Authorization: "Bearer " + token },
    })
    .then((e) => e.data.data);
}

export async function DeleteRepo(id) {
  const confirmDelete = window.confirm(
    `${id} هل أنت متأكد من أنك تريد حذف هذا العنصر؟`
  );
  if (confirmDelete) {
    axios
      .delete(`${url}/${deleteRepo}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((e) => console.warn(e));
    // window.location.reload();
  } else {
    alert("تم رفض الإجراء.");
  }
}
export const CREATE_REPO = async (name) => {
try{  await axios.post(`${url}/${create_Repo}`, name, {
  headers: { Authorization: "Bearer " + token },
});
window.location.reload();}
catch(e){console.log(e)}
};
export const GET_USER_REPO=(id)=>{
  axios
  .post(
    `${url}/${getUserRepo}`,
    { repo_id: id },
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
  .then((e) => e.data.data);
}

