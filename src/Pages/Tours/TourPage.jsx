import React, { lazy, Suspense, useEffect, useState } from "react";
import "./TourPage.scss";
import { Row, Container, Col } from "reactstrap";
// import TourCard from "../../Components/TourCard/TourCard";
const TourCard = lazy(() => import("../../Components/TourCard/TourCard"));
import Aos from "aos";
import "aos/dist/aos.css";
import { useToursQuery } from "../../helper/tourQuery";
import { Helmet } from "react-helmet";
import LoadingPage from "../../Components/Loading/LoadingPage";
import CustomFilter from "./TourDetails/FilterComponents/CustomFilter";
import { Empty, Pagination } from "antd";

const TourPage = () => {
  const [searchParams, setSearchParams] = useState({
    search: "",
    pageNum: 0,
    pageSize: 8,
    travelTypes: [],
    cost: "",
    date: "",
  });
  const { data, isLoading, isError } = useToursQuery(searchParams);
  useEffect(()=>{
    console.log(data);
  },[data])
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
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="tourContainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tours Page</title>
        <link rel="canonical" href="http://localhost:5173/tours" />
      </Helmet>
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
          {isError ? (
            <div
              style={{
                width: "100%",
                minHeight: "550px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Oop! Somethings went wrong!!</h1>
            </div>
          ) : (
            <>
              <Suspense fallback={<LoadingPage />}>
                {data === undefined ? (
                  <LoadingPage />
                ) : data?.count >= 1 ? (
                  <Container className="data-container overflow-auto py-3 px-0 d-flex flex-column">
                    <Row className="data-row row gap-0 w-lg-100 w-100 d-flex justify-content-center justify-content-md-start m-0 justify-content-lg-start">
                      {data?.data?.map((tour) => (
                        <Col
                          key={tour._id}
                          className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 w-lg-100"
                        >
                          <TourCard tour={tour} />
                        </Col>
                      ))}
                    </Row>
                    <div className="paging-section">
                      <Pagination
                        style={{
                          display: data?.count > 0 ? "block" : "none",
                        }}
                        current={searchParams.pageNum + 1}
                        total={
                          data?.count < 10 && data?.count > 8 ? 20 : data?.count
                        }
                        onChange={handlePagination}
                      />
                    </div>
                  </Container>
                ) : (
                  <div className="empty-tag">
                    <Empty />
                  </div>
                )}
              </Suspense>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourPage;
