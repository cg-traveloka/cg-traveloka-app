
import { BrowserRouter, Route, Routes } from "react-router-dom";import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
