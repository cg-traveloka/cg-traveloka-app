import React from "react";
import { Link } from "react-router-dom";
import "../../style/scss/flight/_header.scss";

function Header() {
  return (
    <div>
      <header>
        <div className="container">
          <div className="row">
            <div className="logo">
              <img
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
                alt="logo"
              />
            </div>
            <div className="menu">
              <ul>
                <li>
                  <Link to={""}>Khuyến mãi</Link>
                </li>
                <li>
                  <Link to={""}>Hỗ trợ</Link>
                </li>
                <li>
                  <Link to={""}>Hợp tác với chúng tôi</Link>
                </li>
                <li>
                  <Link href="#"> Đặt chỗ của tôi</Link>
                </li>
                <li className="auth-link-login">
                  <Link href="#">Đăng nhập</Link>
                </li>
                <li className="auth-link-register">
                  <Link href="#">Đăng ký</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-nav">
          <div class="header-nav-container">
            <Link href="#">
              <p>Khách sạn</p>
            </Link>
            <Link href="#">
              <p>Vé máy bay</p>
            </Link>
            <Link href="#">
              <p>Vé máy bay</p>
            </Link>
            <Link href="#">
              <p>Combo tiết kiệm</p>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
