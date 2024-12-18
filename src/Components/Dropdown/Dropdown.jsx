import React, { useState } from "react";
import "./Dropdown.scss";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { signOut } from "../../api/authApi";
const items = [
  {
    key: "1",
    label: (
      <Link
        to={"/profile"}
        style={{
          textDecoration: "none",
          width:20,
        }}
      >
        Profile
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link
        to={"/login"}
        style={{
          textDecoration: "none",
        }}
        onClick={() => {
          localStorage.removeItem("user");
          signOut();
        }}
      >
        Log out
      </Link>
    ),
  },
];
const DropdownComponent = () => {
  const user = useSelector((state) => state.user.user) || {};
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div>
      <Dropdown
        className="dropdown-c"
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
            <div className="userPart">
              <span>
                <RxAvatar className="icon" />
              </span>
              <span className="username-tag">{user?.email}</span>
            </div>
        </a>
      </Dropdown>
      </div>
  );
};

export default DropdownComponent;
