import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import EditProfileContent1 from "./components/profile/EditProfileContent1";
import EditProfileContent2 from "./components/profile/EditProfileContent2";
import Flight from "./pages/flights/Flights";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/*" element={<AuthRoutes />} /> */}
        <Route path="/" element={<EditProfileContent1 />} />
        {/* <Route path="/" element={<EditProfileContent2 />} /> */}
        {/* <Route path="/test" element={<HomePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
