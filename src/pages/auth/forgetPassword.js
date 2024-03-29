import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/scss/auth/_forgetPass.scss";
import axios from "../../config/privateAxios";

function ForgetPass() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState(true);

  const checkEmail = async () => {
    try {
      const checkResponse = await axios.post("/register/check/email", email);

      if (checkResponse.status === 200) {
        setError("");
        setButtonState(false);
      }
    } catch (error) {
      console.error("Error handling forget pass:", error.message);
      setError("Email chưa được đăng ký.");
      setButtonState(true);
    }
  };

  const sendCode = async () => {
    try {
      const sendCodeResponse = await axios.post("/forgetPass/sendCode", email);
      localStorage.setItem("email", email);

      navigate("/forget-pass-validate-code");

      console.log(sendCodeResponse.data);
    } catch (error) {
      console.error("Error sending code:", error.message);
    }
  };

  return (
    <div className="flexbox">
      <div className="container">
        <div className="container-card">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
            alt=""
            style={{ margin: "auto", display: "flex", paddingBottom: "30px" }}
          />
          <div className="card-body">
            <p className="card-title">Bạn quên mật khẩu?</p>

            <p className="card-text">
              Quên mật khẩu? Đừng lo, chỉ cần nhập email dưới đây, chúng tôi sẽ
              gửi mã xác nhận cho bạn ngay thôi!
            </p>
            <div className="reg-form">
              <span className="form-label">Email</span>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={checkEmail}
                  placeholder="Nhập email của bạn ở đây"
                ></input>
                <img
                  src="https://icon-library.com/images/email-icon-vector-png/email-icon-vector-png-14.jpg"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
              </div>
              <p className="error-message">{error}</p>

              <button
                id="btn-next"
                onClick={sendCode}
                disabled={buttonState}
                style={{
                  backgroundColor: buttonState ? "gray" : "#ff5e1f",
                }}
              >
                Gửi mã
              </button>
            </div>
            <div className="line-spacing"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;
