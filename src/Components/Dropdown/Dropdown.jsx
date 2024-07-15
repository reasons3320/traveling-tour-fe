import React, { useState } from "react";
import "./Dropdown.scss";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
const items = [
  {
    key: "1",
    label: (
      <Link
        to={"/profile"}
        style={{
          textDecoration: "none",
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
        }}
      >
        Log out
      </Link>
    ),
  },
];
const DropdownComponent = () => {
  //   const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user.user) || {};
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="d-flex">
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <div className="userPart">
              <span>
                <RxAvatar className="icon" />
              </span>
              <h6>{user?.email}</h6>
            </div>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default DropdownComponent;
