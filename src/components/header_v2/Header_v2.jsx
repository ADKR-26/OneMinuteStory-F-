import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OMS from "../../assets/OMS.png";
import USER_PIC from "../../assets/user.png";
import { useLocation } from "react-router-dom";
import {
  Film,
  Home,
  User,
  PenTool,
  Search,
  TrendingUp,
  BookOpen,
  Bell,
} from "lucide-react";

import "./header_v2.scss";

function Header_v2() {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="header">
      <div className="header__container">
        <div className="header__inner">
          {/* Logo */}
          <div className="section1">
            <Link to="/" className="header__logo">
              <img
                src={OMS}
                alt="One Minute Story Logo"
                className="header__logo-img"
              />
            </Link>
          </div>

          <div className="section2">
            {/* Search Bar */}
            <div className="header__search-desktop">
              <div className="search-box">
                <Search className="search-box__icon" />
                <input
                  type="text"
                  placeholder="Search stories, genres, or authors..."
                  className="search-box__input"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="header__links">
              <Link
                to="/"
                className={`nav-link ${
                  isActive("/") ? "active" : ""
                }`}
              >
                <Home className="nav-icon" />
                <span className="nav-label">Discover</span>
              </Link>

              <Link
                to="/news"
                className={`nav-link ${
                  isActive("/news") ? "active" : ""
                }`}
              >
                <TrendingUp className="nav-icon" />
                <span className="nav-label">Trending</span>
              </Link>

              <Link
                to="/view_stories"
                className={`nav-link ${
                  isActive("/view_stories") ? "active" : ""
                }`}
              >
                <BookOpen className="nav-icon" />
                <span className="nav-label">Browse</span>
              </Link>

              <Link to="/add_story" className="nav-button">
                <PenTool className="nav-icon" />
                <span className="nav-label">New Story</span>
              </Link>

              <Link
                to="/notifications"
                className={`nav-link notification-link ${
                  isActive("/notifications") ? "active" : ""
                }`}
              >
                <Bell className="nav-icon" />
                <span className="notification-dot"></span>
              </Link>

              <Link
                to="/profile"
                className={`nav-link ${
                  isActive("/profile") ? "active" : ""
                }`}
              >
                <User className="nav-icon" />
                <span className="nav-label">Profile</span>
              </Link>

              {/* Mobile Search Toggle */}
              <button
                className="mobile-search-toggle"
                onClick={() =>
                  setIsSearchOpen(!isSearchOpen)
                }
              >
                {/* <Search className="nav-icon" /> */}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {/* {isSearchOpen && (
          <div className="header__search-mobile">
          <div className="search-box">
          <Search className="search-box__icon" />
          <input
          type="text"
          placeholder="Search stories..."
          className="search-box__input"
          />
          </div>
          </div>
          )} */}
        </div>
      </div>
    </nav>
  );
}

export default Header_v2;
