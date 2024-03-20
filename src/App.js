import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import Flight from "./pages/flights/Flights";
import HomePage from "./pages/HomePage";
import FlightFilter from "./components/flight-search/flightFilter";
import Header from "./components/flights/Header";
import Search from "./components/flights/Search";
import Banner from "./components/hompage/Banner";

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
