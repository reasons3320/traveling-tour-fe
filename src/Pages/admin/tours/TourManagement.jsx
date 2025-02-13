import React, { lazy, Suspense, useEffect, useState } from "react";
import "./tourmanagement.scss";
import { Row, Container, Col } from "reactstrap";
// import TourCard from "../../Components/TourCard/TourCard";
// const TourCard = lazy(() => import("../../Components/TourCard/TourCard"));
const TourCard = lazy(() => import("../../../Components/TourCard/TourCard"));

import Aos from "aos";
import "aos/dist/aos.css";
import { useToursQuery } from "../../../helper/tourQuery";
import { Helmet } from "react-helmet";
import LoadingPage from "../../../Components/Loading/LoadingPage";
// import CustomFilter from "././TourDetails/FilterComponents/CustomFilter";
import CustomFilter from "../../Tours/TourDetails/FilterComponents/CustomFilter";

import { Button, Empty, Pagination, Table, Tag } from "antd";
import CustomTable from "../../../Components/Table/CustomTable";
import { useNavigate } from "react-router-dom";
import { PiPlus } from "react-icons/pi";

const TourManagement = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    search: "",
    pageNum: 0,
    pageSize: 8,
    travelTypes: [],
    cost: "",
    date: "",
  });
  const { data, isLoading, isError } = useToursQuery(searchParams);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total:100
    },
  });
  const onHandleCheck = (e) => {
    const id = e.target.value;
    let newTravelTypesArray = searchParams.travelTypes;
    const checked = newTravelTypesArray.some((item) => item === id);
    if (checked) {
      newTravelTypesArray = [
        ...newTravelTypesArray.filter((item) => item !== id),
      ];
    } else {
      newTravelTypesArray = [...newTravelTypesArray, id];
    }
    setSearchParams((prev) => ({
      ...prev,
      travelTypes: newTravelTypesArray,
      pageNum: 0,
    }));
  };

  const handleSearch = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };
  const handlePagination = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      pageNum: e - 1,
    }));
  };
  const handleNavigate = (id)=>{
    console.log("id is",id);
    if(!id){
      navigate('/createtour');
    }else{
      navigate(`/organizer/createtour`,{state:{id}});

    }
  }
  const handleTableChange  = (pagination, filters, sorter)=>{
    console.log("lalala",pagination)
    pagination;
    setTableParams((prev)=>({
      ...prev,
      pagination
    }));
  }
  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "photo",
      key: "photo",
      render: (text) => (
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
          }}
        >
          <img
            src={text}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
          />
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Location",
      dataIndex: "location_id",
      key: "location_id",
      render: (text) => <div>{text?.city_name}</div>,
    },
    {
      title: "Durations(day)",
      dataIndex: "duration_days",
      key: "duration_days",
    },
    {
      title: "Types",
      dataIndex: "types",
      render: (text) => (
        <div>
          {text.map((item, index) => (
            <Tag color={index % 2 == 0 ? "geekblue" : "gold-inverse"}>
              {item.name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Price(VND/Slot)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "",
      render: (text) => (
        <div>
          <Button
            style={{
              borderRadius: 50,
            }}
            onClick={(e)=>handleNavigate(text._id)}
          >
            View Detail
          </Button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="tourOrgContainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tours Management</title>
        <link rel="canonical" href="http://localhost:5173/organizer/tours" />
      </Helmet>
      <div className="add-section">
        <h4>Tour Management</h4>
        <Button onClick={(e)=>handleNavigate()}>
          <PiPlus/>
          Add tour
          </Button>
      </div>
      <div className="mainSide">
        <div className="leftBar">
          <CustomFilter
            handleSearch={handleSearch}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onHandleCheck={onHandleCheck}
          />
        </div>
        <div className="rightSide">
          {/* <Table
            dataSource={data?.data}
            loading={isLoading}
            columns={columns}
          /> */}
          <CustomTable
            data={data?.data}
            loading={isLoading}
            columns={columns}
            pagination={tableParams?.pagination}
            handleTableChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TourManagement;
