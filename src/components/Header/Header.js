import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import logo from "assets/images/lg-2.png";
import { appRoutes } from "router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/users/action";
import "./Header.sass";
import { I18LANGUAGE } from "configs";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function Header() {
  const [isSelectItem, setIsSelectItem] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let history = useHistory();
  const user = useSelector((state) => state.user.profile);
  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };
  function handleClickUserActionDropdown(visible) {
    setIsSelectItem(visible);
  }
  const handleDropdownDisplay = (e) => {
    e.preventDefault();
  };

  return (
    <header className="header flex-center">
      <div className="header__container">
        <div className="header-logo">
          <Link to={"/"}>
            <img className="header-logo__img" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header-search">
          <SearchInput />
        </div>
        <div className="header-control">
          <ul className="header-control__list">
            {appRoutes.map((route, index) => {
              return (
                <div key={index} >
                  {route.isShowOnNav && (
                    <li style={{marginLeft: '10px'}}>
                      <Link to={route.path} className="header-control__item">
                        {history.location.pathname === route.path
                          ? route.activeIcon
                          : route.inActiveIcon}
                      </Link>
                    </li>
                  )}
                </div>
              );
            })}
            <li className="header-control__item" style={{marginLeft: '10px'}}>
              <div className="header__dropdown">
                {isSelectItem ? (
                  <div
                    tabIndex="5"
                    className="no-focus-outline"
                    onBlur={(e) => handleClickUserActionDropdown(false)}
                  >
                    <i
                      style={{ marginTop: "11px" }}
                      className="fas fa-user-circle"
                      onClick={(e) => handleClickUserActionDropdown(false)}
                    ></i>
                    <div className="header__dropdown-triangle-up"></div>
                    <div className="header__dropdown-hidden"></div>
                    <div
                      className="header__dropdown-box noselect"
                      onMouseDown={(e) => handleDropdownDisplay(e)}
                    >
                      <ul className="header__dropdown-list">
                        <li
                          className="header__dropdown-item"
                          onClick={() =>
                            handleClickUserActionDropdown(0, "Hung")
                          }
                        >
                          <Link
                            className="header__dropdown-link"
                            to={"/profile/" + user?.username}
                          >
                            <i className="header__dropdown-item-icon fas fa-user"></i>
                            <div className="header__dropdown-item-text">
                              Profile
                            </div>
                          </Link>
                        </li>
                        <li className="header__dropdown-item">
                          <Link className="header__dropdown-link" to="#">
                            <i className="header__dropdown-item-icon fas fa-bookmark"></i>
                            <div className="header__dropdown-item-text">
                              Saved
                            </div>
                          </Link>
                        </li>

                        <li className="header__dropdown-item">
                          <Link className="header__dropdown-link" to="/setting">
                            <i className="header__dropdown-item-icon fas fa-cogs"></i>
                            <div className="header__dropdown-item-text">
                              Settings
                            </div>
                          </Link>
                        </li>
                        <li className="header__dropdown-item">
                          <div
                            className="header__dropdown-link"
                            onClick={(e) => {
                              e.preventDefault();
                              const lng =
                                localStorage.getItem(I18LANGUAGE) === "vi"
                                  ? "en"
                                  : "vi";
                              localStorage.setItem(I18LANGUAGE, lng);
                              i18n.changeLanguage(lng);
                              setIsSelectItem(false);
                            }}
                            to="#"
                          >
                            <i className="header__dropdown-item-icon fas fa-exchange-alt"></i>
                            <div className="header__dropdown-item-text">
                              {t("switchLanguage")}
                            </div>
                          </div>
                        </li>
                        <li className="header__dropdown-item">
                          <div onClick={handleLogout}>
                            <div className="header__dropdown-item-text --logout">
                              Log Out
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <i
                    tabIndex="5"
                    style={{ marginTop: "11px" }}
                    className="no-focus-outline far fa-user-circle"
                    onClick={(e) => handleClickUserActionDropdown(true)}
                    onBlur={(e) => handleClickUserActionDropdown(false)}
                  ></i>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
export default Header;
