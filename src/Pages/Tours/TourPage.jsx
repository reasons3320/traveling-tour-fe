import React, { Suspense, useCallback, useEffect, useState } from "react";
import "./TourPage.scss";
// import { Button, Form } from "react-bootstrap";
import { Input, Row, Container, Col, Spinner, Button } from "reactstrap";
import { MdAdd, MdSearch } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getTourCount, getTours } from "../../api/tourApi";
import TourCard from "../../Components/TourCard/TourCard";
import Aos from "aos";
import "aos/dist/aos.css";
import { useToursForSearchQuery, useToursQuery } from "../../helper/tourQuery";
import { CgAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import loadingImg from "../../assets/loading.png";

import { debounce } from "lodash";
import AlbumsGlimmer from "../../Components/Suspense/Glimmer";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Helmet } from "react-helmet";
const filterCheckedLists = [
  {
    label: "Beach",
    id: "beachCheck",
    value: "BE5",
  },
  {
    label: "Natural Park",
    id: "parkCheck",
    value: "park",
  },
  {
    label: "History",
    id: "historyCheck",
    value: "HI7",
  },
  {
    label: "Mountain",
    id: "mountainCheck",
    value: "MO8",
  },
  {
    label: "Island",
    id: "islandCheck",
    value: "island",
  },
];
const filterCheckedPopularLists = [
  {
    label: "Ho Chi Minh",
    id: 1,
    value: "hochiminh",
  },
  {
    label: "Nha Trang",
    id: 2,
    value: "nhatrang",
  },
  {
    label: "Da Nang",
    id: 3,
    value: "danang",
  },
];
const TourPage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [filterList, setFilterList] = useState([]);
  const [finalData, setFinalData] = useState([]);

  const { data, isLoading, isError } = useToursQuery(page);
  const { data: filteredList } = useToursForSearchQuery(search, filterList);
  const { data: tourCount } = useQuery({
    queryKey: ["tourCount"],
    queryFn: () => getTourCount(),
  });

  const onHandleCheck = (e) => {
    let newArray = [];
    const currentFilterValue = e.target.value;
    // console.log("Current value", currentFilterValue);
    const checked = filterList.find((item) => item === currentFilterValue);
    if (checked) {
      // console.log("Co no moi re turn", checked);
      newArray = filterList.filter((item) => item !== currentFilterValue);
      setFilterList(newArray);
    } else {
      setFilterList([...filterList, currentFilterValue]);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const length = data?.length;
    const lengthFiltered = filteredList?.length;
    if (search !== "") {
      const pages = Math.ceil(length / 8);
      setPageCount(pages);
      // window.scroll(0, 0);
    } else if (search) {
      const pages = Math.ceil(lengthFiltered / 8);
      setPageCount(pages);
    } else {
      const pages = Math.ceil(tourCount / 8);
      setPageCount(pages);
      // window.scroll(0, 0);
    }
  }, [page, tourCount, data, filteredList]);
  useEffect(() => {
    if (search !== "" || filterList.length > 0) {
      setFinalData(filteredList);
    } else {
      setFinalData(data);
    }
  }, [data, filteredList]);
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
      <div
        style={{
          marginTop: 120,
        }}
      ></div>
      <div className="mainSide">
        <div className="leftBar">
          <div className="searchBar">
            <h6>Filters</h6>
            <div class="searchBarItems">
              <Input
                type="text"
                placeholder="Where do you go ?"
                onChange={handleSearch}
                value={search}
              />
            </div>
            {/* =======Tour type========= */}

            {filterCheckedLists.map((item, index) => (
              <div class=" form-check" key={item.index}>
                <Input
                  class="form-check-input"
                  type="checkbox"
                  value={item.value}
                  id={item.id}
                  onChange={onHandleCheck}
                />
                <label class="form-check-label" for={item.id}>
                  {item.label}
                </label>
              </div>
            ))}
            {/* =======Popular city========= */}
            {/* <h6 style={{ margin: "10px 0" }}>Popular cities</h6>
            {filterCheckedPopularLists.map((item, index) => (
              <div class=" form-check" key={item.index}>
                <Input
                  class="form-check-input"
                  type="checkbox"
                  value={item.value}
                  id={item.id}
                  onChange={onHandleCheck}
                />
                <label class="form-check-label" for={item.id}>
                  {item.label}
                </label>
              </div>
            ))} */}
          </div>
        </div>

        <div
          className="rightSide"
          style={{
            position: "relative",
          }}
        >
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
          ) : isLoading ? (
            <>
              {/* <Spinner /> */}
              <div
                className="imgContainer"
                style={{
                  width: "60%",
                  height: "60%",
                  margin: "auto",
                }}
              >
                <img
                  src={loadingImg}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <Container>
                <Row>
                  {search !== "" || filterList.length > 0
                    ? filteredList?.map((tour) => (
                        <Col
                          lg="3"
                          md="6"
                          sm="12"
                          key={tour.id}
                          className={"mb-4"}
                        >
                          <TourCard tour={tour} />
                        </Col>
                      ))
                    : data?.map((tour) => (
                        <Col
                          lg="4"
                          md="6"
                          sm="12"
                          key={tour.id}
                          className={"mb-4"}
                        >
                          <TourCard tour={tour} />
                        </Col>
                      ))}
                </Row>
              </Container>
              <Col
                className="d-flex align-items-center justify-content-center"
                lg="12"
                style={{
                  position: "absolute",
                  bottom: 5,
                  width: "100%",
                }}
              >
                {finalData?.length > 0 ? (
                  <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                    {[...Array(pageCount || []).keys()].map((number) => (
                      <span
                        key={number}
                        onClick={() => setPage(number)}
                        className={page === number ? "active__page" : ""}
                      >
                        {number + 1}
                      </span>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </Col>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourPage;
