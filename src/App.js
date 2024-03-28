import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import Flight from "./pages/flights/Flights";
import Hotels from "./pages/hotel/Hotels";
import ProtectedRoute from "./routes/ProtectedRoute";
import { selectUser } from "./redux/features/userSlice";
import EditPendingBookingHotelStatus from "./components/profile/EditPendingBookingHotelStatus";
import HomePage from "./pages/HomePage";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { selectModal, setModalIsOpen } from "./redux/features/modalSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FlightTitle from "./components/flight-search/FlightTitle";
import Search from "./components/flights/Search";
import FlightFilter from "./components/flight-search/flightFilter";
import FlightSearch from "./pages/FlightSearch";
import FlightTera from "./pages/FightTera";
import ComboDiscovery from "./components/hompage/ComboDiscovery";
import SeatDetailPage from "./components/flight-search/SeatDetailPage";
import EditPendingBookingComboStatus from "./components/profile/EditPendingBookingComboStatus";

Modal.setAppElement("#root");

function App() {
  const user = useSelector(selectUser);
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();
  let subtitle;
  let statusColor;

  useEffect(() => {
    if (modal.status === "info") statusColor = "#3498db";
    if (modal.status === "sucess") statusColor = "#07bc0c";
    if (modal.status === "error") statusColor = "#e74c3c";
  });

  const customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "200px",
      width: "500px",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#fff",
      color: statusColor,
      border: "1px solid #3498db",
      animationDuration: "3s",
      animationTimingFunction: "ease-out",
    },
  };

  function afterOpenModal() {
    subtitle.style.color = statusColor;
  }

  function closeModal() {
    dispatch(setModalIsOpen(false));
  }

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        // className="modalRoot"
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className="modalTitle" ref={(_subtitle) => (subtitle = _subtitle)}>
          Thông báo
        </h2>
        <div className="modalMessage">{modal.message}</div>
        <button
          onClick={closeModal}
          className={
            modal.status === "sucess"
              ? "modalButtonSucess"
              : modal.status === "info"
              ? "modalButtonInfo"
              : "modalButtonError"
          }
        >
          Xác nhận
        </button>
      </Modal>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<AuthRoutes />} />
          <Route element={<ProtectedRoute isAllowed={user.user != null} />}>
            <Route path="/hotels" element={<Hotels />} />
          </Route>
          <Route path="/flight-search" element={<FlightSearch />} />
          <Route path="/search" element={<Flight />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home1" element={<SeatDetailPage />} />
          <Route path="/:id" element={<EditPendingBookingHotelStatus />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
