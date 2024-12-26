import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./TourDetailsPage.scss";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../../../utils/avgCalculate";
import avatar from "../../../assets/avt3.jpg";
import Booking from "../../../Booking/Booking";
import { useGetSingleTourQuery } from "../../../helper/tourQuery";
import { MdStar } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCreateReviewMessageQuery } from "../../../helper/bookingQuery";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "antd";
const TourDetailsPage = () => {
  const { tourId } = useParams();
  const queryClient = useQueryClient();
  const {
    data: tour,
    isLoading,
    error,
  } = useGetSingleTourQuery(tourId, {
    suspense: true,
  });
  const {
    photo,
    title,
    desc,
    price,
    reviews,
    location,
    distance,
    maxGroupSize,
    address,
    organizer_id,
    duration_days,
  } = tour || {};
  const user = useSelector((state) => state.user.user);
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} onClick={() => setTourRating(i)}>
          <MdStar
            className="icon"
            style={{
              color: i <= tourRating ? "yellow" : "gray",
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
        </span>
      );
    }
    return stars;
  };
  const { mutate: createReviewMassage, data } = useCreateReviewMessageQuery();
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };
      if (tourRating === null) {
        toast.error("Please choose rating for this review! ");
        return;
      }
      createReviewMassage(
        { tourId, reviewObj, toast },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["singleTour", tourId]);
            toast.success("Review is submitted!.");
          },
          onError: (error) => {
            toast.error("Failure to submit review!.");
          },
        }
      );
      setTourRating(0);
      reviewMsgRef.current.value = "";
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);
  return (
    <div className="TourDetailsSection">
      <Container className="TourDetailContainer">
        {isLoading && (
          <div
            style={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              backgroundColor: "#0000004b",
              top: 0,
              left: 0,
            }}
          ></div>
        )}
        {error && <h4 className="text-center">{error}</h4>}
        {!isLoading && !error && (
          <Row>
            <Col lg="8">
              {isLoading && <Skeleton active />}
              <Suspense
                fallback={
                  <div
                    style={{
                      backgroundColor: "black",
                      height: "100vh",
                      width: "100vw",
                    }}
                  ></div>
                }
              >
                <div className="tour__content">
                  <img src={photo} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <MdStar className="icon" />{" "}
                        {avgRating === 0 ? null : avgRating}{" "}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i class="ri-map-pin-user-fill"></i>
                        {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i class="ri-map-pin-2-line"></i>
                        Des:{location}
                      </span>
                      <span>
                        <i class="ri-money-dollar-circle-line"></i>
                        <span>Cost:</span>
                        {price} $/ per person
                      </span>
                      <span>
                        <i class="ri-map-pin-time-line"></i>
                        Duration:{duration_days} days
                      </span>
                      <span>
                        <i class="ri-group-line"></i>
                        Size:{maxGroupSize} people
                      </span>
                    </div>
                    <div>
                      <h5>Description</h5>
                      <p>{desc}</p>
                    </div>
                    <div className="tour__info__organizer">
                      <h5>Organizer: {organizer_id?.username}</h5>
                    </div>
                  </div>
                  {/* tour reviews section */}
                  <ListGroup className="tour__reviews mt-4 d-flex justify-items-center">
                    <h4
                      style={{
                        margin: 0,
                      }}
                    >
                      Reviews({reviews?.length} reviews)
                    </h4>
                    <Form className="reviews__form" onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {renderStars()}
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button className="btn primary__btn" type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>
                    <div className={"user__reviews"}>
                      {reviews?.map((rev, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{rev.username}</h5>
                                <p>
                                  {new Date(rev.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {rev.rating} <MdStar className="icon" />
                              </span>
                            </div>
                            <h6>{rev.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ListGroup>
                </div>
              </Suspense>
            </Col>
            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default TourDetailsPage;
{
  /* <Newsletter /> */
}
