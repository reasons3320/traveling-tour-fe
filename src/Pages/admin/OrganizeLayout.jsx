import { Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { BiDesktop, BiUser } from "react-icons/bi";
import { FaTeamspeak } from "react-icons/fa";
import { LuFileOutput } from "react-icons/lu";
import { MdPieChartOutlined } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./OrganizeLayout.scss";
import DropdownComponent from "../../Components/Dropdown/Dropdown";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "dashboard", <MdPieChartOutlined />),
  getItem("Tours", "tours", <BiDesktop />),
  getItem("Schedule", "schedule", <BiUser />),
  getItem("Booking", "booking", <FaTeamspeak />),
  getItem("Log out", "logout", <LuFileOutput />),
];
const OrganizeLayout = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleMenuClick = (e) => {
    setCurrent(e.key);
    const value = e.key?.toLowerCase();
    if (value === "logout") {
      dispatch(logout());
      navigate('/login')
    } else {
      navigate(`/${value}`);
    }
  };
  useEffect(()=>{
    navigate(`/dashboard`);
  },[])
  return (
    <section>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            background: colorBgContainer,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            selectedKeys={[current]}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <div className="layout-header">
            {/* <h3>{current.charAt(0).toUpperCase() + current.slice(1)}</h3> */}
            <DropdownComponent />
          </div>
          <Outlet />
        </Layout>
      </Layout>
    </section>
  );
};

export default OrganizeLayout;
