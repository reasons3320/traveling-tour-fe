import React, { useContext, useEffect, useRef, useState } from "react";
import "./TourDetailsPage.scss";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../../../utils/avgCalculate";
import avatar from "../../../assets/avt3.jpg";
// import Newsletter from "../shared/Newsletter";
import Booking from "../../../Booking/Booking";
import { useGetSingleTourQuery } from "../../../helper/tourQuery";
import { MdStar } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCreateReviewMessageQuery } from "../../../helper/bookingQuery";
import toast from "react-hot-toast";
import { createReviewMassage } from "../../../api/bookingApi";
import { useQueryClient } from "@tanstack/react-query";
const TourDetailsPage = () => {
  const { tourId } = useParams();
  const queryClient = useQueryClient();
  const { data: tour, loading, error } = useGetSingleTourQuery(tourId);
  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    distance,
    maxGroupSize,
    address,
  } = tour || {};
  const user = useSelector((state) => state.user.user);
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  // if (!loading && !error && tour) {
  //   console.log("data", tour.photo);
  // }
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
        {loading && <h4 className="text-center">Loading....</h4>}
        {error && <h4 className="text-center">{error}</h4>}
        {!loading && !error && (
          <Row>
            <Col lg="8">
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
                      {city}
                    </span>
                    <span>
                      <i class="ri-money-dollar-circle-line"></i>
                      {price} / per person
                    </span>
                    <span>
                      <i class="ri-map-pin-time-line"></i>
                      {distance} k/m
                    </span>
                    <span>
                      <i class="ri-group-line"></i>
                      {maxGroupSize} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                {/* tour reviews section */}
                <ListGroup className="tour__reviews mt-4 d-flex justify-items-center">
                  <h4>Reviews({reviews?.length} reviews)</h4>
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
