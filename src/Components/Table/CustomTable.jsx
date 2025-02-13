import { Button, Table } from "antd";
import React from "react";
import "./customtable.scss";
const CustomTable = ({
  columns = [],
  data = [],
  loading = false,
  handleClick,
  handleTableChange ,
  pagination,
  ...props
}) => {
  console.log("Received pagination",pagination);
  return (
    <div>
      <Table
        onHeaderRow={(columns) => ({
          style: { backgroundColor: "pink", color: "red" },
        })}
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          style: {
            padding: "0 20px",
          },
          pageSize: pagination?.pageSize || 5,
          total: pagination?.total || 100,
          current: pagination?.current || 1,
        }}
        onChange={(pagination, filters, sorter)=>{
         handleTableChange(pagination, filters, sorter)
        }}
        rowClassName={(record, index) => {
          return index % 2 == 0 ? "even" : "";
        }}
        onRow={() => ({
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

export default CustomTable;
