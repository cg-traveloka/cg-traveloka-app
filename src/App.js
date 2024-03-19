import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import EditProfileContent1 from "./components/EditProfileContent1";
import EditProfileContent2 from "./components/EditProfileContent2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/*" element={<AuthRoutes />} /> */}
        <Route path="/" element={<EditProfileContent1 />} />
        {/* <Route path="/" element={<EditProfileContent2 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
