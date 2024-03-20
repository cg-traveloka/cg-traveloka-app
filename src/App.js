import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import Flight from "./pages/flights/Flights";
import HomePage from "./pages/HomePage";
import EditCustomerInformationSaved from "./components/profile/EditCustomerInformationSaved";
import EditProfileBonus from "./pages/profile/EditProfileBonus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/*" element={<AuthRoutes />} /> */}
        {/* <Route path="/test" element={<HomePage />} /> */}
        <Route path="/" element={<EditCustomerInformationSaved />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
