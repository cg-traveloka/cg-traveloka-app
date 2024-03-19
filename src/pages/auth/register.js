import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/scss/base/_reset.scss";

import "../../style/scss/auth/_register.scss";
import { API_CONFIG } from "../../config/apiConfig";
function Register() {
  const [passwordShow, setPasswordShow] = useState(false);
  const [checkPasswordShow, setCheckPasswordShow] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value.trim() };
    setFormData(newFormData);
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0[0-9]{9}$/;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]+$/;
    let newErrors = { ...error };
    const requiredFields = [
      "email",
      "username",
      "phone",
      "password",
      "confirmPassword",
    ];
    requiredFields.forEach((field) => {
      if (formData[field] === "") {
        newErrors[field] = "Trường này là bắt buộc.";
      }
    });
    if (name === "email" && formData.email !== "") {
      newErrors.email = emailRegex.test(value)
        ? ""
        : "Vui lòng nhập địa chỉ email hợp lệ.";
    }
    if (name === "username" && formData.username !== "") {
      newErrors.username = usernameRegex.test(value)
        ? ""
        : "Tên tài khoản phải bắt đầu với các chữ cái và có ít nhất hai ký tự.";
    }
    if (name === "phone" && formData.phone !== "") {
      newErrors.phone = phoneRegex.test(value)
        ? ""
        : "Vui lòng nhập số điện thoại hợp lệ.";
    }
    if (name === "password" && formData.password !== "") {
      newErrors.password =
        value.length >= 6 ? "" : "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (name === "confirmPassword" && formData.confirmPassword !== "") {
      newErrors.confirmPassword =
        value === formData.password ? "" : "Xác nhận mật khẩu không khớp.";
    }
    // if (["username", "email", "phone"].includes(name)) {
    //   let config = {
    //     method: "post",
    //     url: `http://localhost:8080/check/${name}`,
    //     headers: { "Content-Type": "" },

    //     data: value,
    //   };
    //   try {
    //     const response = await axios(config);
    //     newErrors[name] = `${name} đã tồn tại`;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    if (["username", "email", "phone"].includes(name)) {
      console.log(`Sending request for ${name}: ${value}`);

      let config = {
        method: "post",
        url: `http://localhost:8080/register/check/${name}`,
        headers: { "Content-Type": "text/plain" },
        data: value,
      };
      try {
        const response = await axios(config);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 406) {
          // Capitalize the first letter of 'name'
          let capitalizedError = name.charAt(0).toUpperCase() + name.slice(1);
          newErrors[name] = `${capitalizedError} đã tồn tại`;
        }
      }
    }
    setError(newErrors);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const isFilled =
      formData.email &&
      formData.username &&
      formData.phone &&
      formData.password &&
      formData.confirmPassword;

    if (!isFilled) {
      alert("Vui lòng điền đúng thông tin.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/register/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Đã đăng ký thành công!" + response.data);
        localStorage.setItem("email", formData.email);
        navigate("/register-validate-code");
      } else {
        console.error("Đăng ký không thành công!");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi request đăng ký:", error.message);
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShow(!passwordShow);
  };
  const toogleCheckPasswordVisblity = () => {
    setCheckPasswordShow(!checkPasswordShow);
  };
  return (
    <div className="flexbox">
      <div className="container">
        <div className="card">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
            alt=""
            style={{ margin: "auto", display: "flex" }}
          />{" "}
          <div className="card-body">
            <h5 className="card-title">Tạo tài khoản mới</h5>

            <p className="card-text">
              Đăng ký ngay tài khoản của bạn trên Traveloka và trải nghiệm sự
              thuận tiện khi đặt phòng khách sạn hoặc vé máy bay!
            </p>
            <div className="reg-form">
              <span className="form-label">Email</span>
              <i className="fa fa-envelope icon"></i>

              <input
                type="text"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.email}
                className={error.email ? "input-error" : ""}
                placeholder="Nhập email của bạn ở đây"
              ></input>
              {error.email && <p className="error-message">{error.email}</p>}

              <span className="form-label">Username</span>
              <i className="fa fa-lock icon"></i>
              <input
                className={`form-input ${error.username ? "input-error" : ""}`}
                type="text"
                name="username"
                value={formData.username}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Nhập username của bạn ở đây"
              ></input>
              {error.username && (
                <p className="error-message">{error.username}</p>
              )}

              <span className="form-label">Số điện thoại</span>
              <i className="fa-solid fa-phone icon"></i>
              <input
                type="text"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.phone}
                className={error.phone ? "input-error" : ""}
                placeholder="Nhập số điện thoại của bạn ở đây"
              ></input>
              {error.phone && <p className="error-message">{error.phone}</p>}

              <div className="input-wrapper">
                <span className="form-label">Mật khẩu</span>
                <div style={{ position: "relative" }}>
                  <i className="fa fa-lock icon"></i>
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={error.password ? "input-error" : ""}
                    value={formData.password}
                    placeholder="Điền mật khẩu của bạn ở đây"
                  ></input>
                </div>

                <div className="eye-icon" onClick={togglePasswordVisiblity}>
                  {passwordShow ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <rect width="18" height="18"></rect>
                        <path
                          stroke="#0194F3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2,12 C4.66666667,7.33333333 8,5 12,5 C16,5 19.3333333,7.33333333 22,12 C19.3333333,16.6666667 16,19 12,19 C8,19 4.66666667,16.6666667 2,12 Z"
                        ></path>
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="#687176"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></circle>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <rect width="18" height="18"></rect>
                        <path
                          stroke="#0194F3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2,12 C4.66666667,7.33333333 8,5 12,5 C16,5 19.3333333,7.33333333 22,12 C19.3333333,16.6666667 16,19 12,19 C8,19 4.66666667,16.6666667 2,12 Z"
                        ></path>
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="#687176"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></circle>
                        <path
                          stroke="#FFF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3.5,21.5 L21.5,3.5 C21.7761424,3.22385763 21.7761424,2.77614237 21.5,2.5 L21.5,2.5 C21.2238576,2.22385763 20.7761424,2.22385763 20.5,2.5 L2.5,20.5 C2.22385763,20.7761424 2.22385763,21.2238576 2.5,21.5 L2.5,21.5 C2.77614237,21.7761424 3.22385763,21.7761424 3.5,21.5 Z"
                        ></path>
                        <path
                          stroke="#0194F3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3,21 L21,3"
                        ></path>
                      </g>
                    </svg>
                  )}
                </div>
                {error.password && (
                  <p className="error-message">{error.password}</p>
                )}
              </div>
              <div className="input-wrapper">
                <span className="form-label"> Nhập lại mật khẩu</span>
                <div style={{ position: "relative" }}>
                  <i className="fa fa-lock icon"></i>
                  <input
                    type={checkPasswordShow ? "text" : "password"}
                    name="confirmPassword"
                    className={error.confirmPassword ? "input-error" : ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Điền mật khẩu của bạn ở đây"
                  />
                </div>

                <div className="eye-icon" onClick={toogleCheckPasswordVisblity}>
                  {checkPasswordShow ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <rect width="18" height="18"></rect>
                        <path
                          stroke="#0194F3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2,12 C4.66666667,7.33333333 8,5 12,5 C16,5 19.3333333,7.33333333 22,12 C19.3333333,16.6666667 16,19 12,19 C8,19 4.66666667,16.6666667 2,12 Z"
                        ></path>
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="#687176"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></circle>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <rect width="18" height="18"></rect>
                        <path
                          stroke="#0194F3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2,12 C4.66666667,7.33333333 8,5 12,5 C16,5 19.3333333,7.33333333 22,12 C19.3333333,16.6666667 16,19 12,19 C8,19 4.66666667,16.6666667 2,12 Z"
                        ></path>
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="#687176"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></circle>
                        <path
                          stroke="#FFF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3.5,21.5 L21.5,3.5 C21.7761424,3.22385763 21.7761424,2.77614237 21.5,2.5 L21.5,2.5 C21.2238576,2.22385763 20.7761424,2.22385763 20.5,2.5 L2.5,20.5 C2.22385763,20.7761424 2.22385763,21.2238576 2.5,21.5 L2.5,21.5 C2.77614237,21.7761424 3.22385763,21.7761424 3.5,21.5 Z"
                        ></path>
                        <path
                          stroke="#0194F3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3,21 L21,3"
                        ></path>
                      </g>
                    </svg>
                  )}
                </div>
                {error.confirmPassword && (
                  <p className="error-message">{error.confirmPassword}</p>
                )}
              </div>

              <button id="btn-next" onClick={handleRegister}>
                Register
              </button>
            </div>
            <div className="line-spacing"></div>
            <p>
              Bạn đã có tài khoản?
              <Link
                to="/"
                style={{ color: "rgb(88, 153, 214)", fontWeight: "600" }}
              >
                Đăng nhập ở đây
              </Link>
            </p>
            <div className="login-with">
              <div>
                <i className="fa-brands fa-google"></i>
                <a
                  href="http://localhost:8080/oauth2/authorization/google"
                  style={{ textDecoration: "none" }}
                >
                  Tiếp tục với Google
                </a>
              </div>
              <div>
                <i className="fa-brands fa-facebook-f"></i>
                <a
                  href="http://localhost:8080/oauth2/authorization/facebook"
                  style={{ textDecoration: "none" }}
                >
                  Tiếp tục với Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
