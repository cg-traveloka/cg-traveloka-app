import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import Flight from "./pages/flights/Flights";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AuthRoutes />} />
        <Route path="/test" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
