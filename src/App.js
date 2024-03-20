
import { BrowserRouter, Route, Routes } from "react-router-dom";import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import Hotels from "./pages/hotel/Hotels";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useSelector} from "react-redux";
import { selectUser} from "./redux/features/userSlice";
import Flight from "./pages/flights/Flights";
import HomePage from "./pages/HomePage";


function App() {

  const user = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AuthRoutes />} />
        <Route element={<ProtectedRoute isAllowed={user.user!=null} />}>
            <Route path="/hotels" element={<Hotels/>}/> 
        </Route>
        <Route path="/test" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
