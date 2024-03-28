import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="homepage-header">
      <div class="homepage-header-container">
        <div class="homepage-header-container-row">
          <div class="homepage-header-container-row-logo">
            <img
              src="https://e-magazine.asiamedia.vn/wp-content/uploads/2022/02/86afd0785f5505dd6d584971576dea27.svg"
              alt="logo"
            />
          </div>
          <div class="homepage-header-container-row-menu">
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
                <Link to={""}> Đặt chỗ của tôi</Link>
              </li>
              <li className="auth-link-login">
                <Link to={"/login"}>Đăng nhập</Link>
              </li>
              <li className="auth-link-register">
                <Link to={""}>Đăng ký</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
