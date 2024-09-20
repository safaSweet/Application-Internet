import axios from "axios";
import Cookie from "cookie-universal";
import { url, login, logout, register } from "./EndPoint";

const cookie = Cookie();

export const REGISTER = async (data) => {
  await axios.post(`${url}/${register}`, data);
  window.location.pathname = "/VerifyPage";
};
export const LOGIN = async (user) => {
  try {
    const res = await axios.post(`${url}/${login}`, user);
    const token = res.data.data.token;
    cookie.set("token", token);
    window.location.pathname = "/";
  } catch (error) {}
};
export const LOGOUT = async () => {
  const token = cookie.get("token");
  await axios.get(`${url}/${logout}`, {
    headers: { Authorization: "Bearer " + token },
  });
  cookie.remove("token");
  window.location.reload();
};
export const VERIFY = async (name) => {
  const response = await axios.post(`http://127.0.0.1:8000/api/verify`, name);
  const token = response.data.data.token;
  cookie.set("token", token);
};
