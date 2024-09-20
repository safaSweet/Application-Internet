import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Auth/Login";
import HomePage from "./Pages/HomePage";
import Users from "./Pages/Users/Users";
import Folder from "./Pages/Folder/Folders";
import Files from "./Pages/Files.js/Files";
import Register from "./Auth/Register";
import EditFile from "./Pages/Files.js/Edit-File";
import VerifyPage from "./Auth/VerifyPage";
import RequireAuth from "./Auth/RequireAuth";
import FileContentReader from "./Pages/Files.js/FileContentReader";
import Report from "./Pages/Folder/Report";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/VerifyPage" element={<VerifyPage />} />

        <Route element={<RequireAuth />}>
          <Route element={<HomePage />}>
            {/* <Route path="/" element={<Users />} /> */}
            <Route path="/" element={<Folder />} />
            {/* <Route path='/Files' element={<Files/>}/> */}
            <Route path="/Files/:id" element={<Files />} />
            <Route path="/Report/:id" element={<Report/>} />
            {/* <Route path="/Edit_File" element={<EditFile />} /> */}
            <Route path="/FileContentReader" element={<FileContentReader />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
