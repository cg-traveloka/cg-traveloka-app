import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import Flight from "./pages/flights/Flights";
import Hotels from "./pages/hotel/Hotels";
import ProtectedRoute from "./routes/ProtectedRoute";
import { selectUser } from "./redux/features/userSlice";
import HomePage from "./pages/HomePage";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { selectModal, setModalIsOpen } from "./redux/features/modalSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditTable from "./components/profile/EditTable";
import EditProfile from "./components/profile/EditProfile";
import ListBookingHotelStatus from "./components/profile/ListBookingHotelStatus";
import ReviewHotel from "./components/profile/ReviewHotel";
import ListBookingAirplaneStatus from "./components/profile/ListBookingAirplaneStatus";
import ListBookingComboStatus from "./components/profile/ListBookingComboStatus";
import EditBonus from "./components/profile/EditBonus";

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
            <Route path="/bookinghotel" element={<ListBookingHotelStatus />} />
            <Route
              path="/bookingticket"
              element={<ListBookingAirplaneStatus />}
            />
            <Route path="/bookingcombo" element={<ListBookingComboStatus />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/table" element={<EditTable />} />
            <Route path="/review/:id" element={<ReviewHotel />} />
            <Route path="/mybonus" element={<EditBonus />} />
          </Route>
          <Route path="/profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
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
