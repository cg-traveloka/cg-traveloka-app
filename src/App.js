import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import Flight from "./pages/flights/Flights";
import EditCustomerInformationSaved from "./components/profile/EditCustomerInformationSaved";
import EditProfileBonus from "./pages/profile/EditProfileBonus";
import Hotels from "./pages/hotel/Hotels";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/userSlice";
import HomePage from "./pages/HomePage";
import EditCustomerProfile from "./components/profile/EditCustomerProfile";

function App() {
  const user = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/*" element={<AuthRoutes />} /> */}
        {/* <Route path="/test" element={<HomePage />} /> */}
        <Route path="/" element={<EditCustomerProfile />} />
        <Route element={<ProtectedRoute isAllowed={user.user != null} />}>
          <Route path="/hotels" element={<Hotels />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
