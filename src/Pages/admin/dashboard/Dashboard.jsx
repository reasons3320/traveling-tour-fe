import React from "react";
import "./dashboard.scss";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Tabs } from "antd";
const Dashboard = () => {
  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data02 = [
    {
      name: "History",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
    },
  ];
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children:(
        <div>
          adsssss
        </div>
      )
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div className="dashboard-container">
      <div className="statical">
        <div className="statical-revenue">
          <PieChart width={200} height={200}>
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#FF7F37"
              label
            />
          </PieChart>
        </div>
        <div className="statical-chart">
          <LineChart
            width={500}
            height={200}
            data={data02}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Line type="monotone" dataKey="name" stroke="#8884d8" />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" /> */}
          </LineChart>
        </div>
      </div>
      <div className="more-info-section">
        <div className="more-info-left">
          <Tabs
            defaultActiveKey="1"
            centered
            items={items}
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="more-info-right">
          <div className="right-first">
            <div className="weather"></div>
            <div className="total-likes"></div>
          </div>
          <div className="right-second">
            <div className="list-popular-tour"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
