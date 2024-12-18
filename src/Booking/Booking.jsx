import React, {useState } from "react";
import "./Booking.scss";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useBookingTourQuery } from "../helper/bookingQuery";
import toast from "react-hot-toast";
import { createBooking } from "../api/bookingApi";
const Booking = ({ tour, avgRating }) => {
  const navigate = useNavigate();
  const { price, reviews, title, maxGroupSize } = tour || {};
  const user = useSelector((state) => state.user.user);
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 0,
    bookAt: "",
  });
  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);
  const handleClick = async (e) => {
    e.preventDefault();
    if (!user || user === undefined || user === null) {
      return alert("Please Sign In");
    }
    // createBooking(booking);
    createBooking(booking, toast).then((res) => {
      if (res.success === false) {
        toast.error("You're not authorize !");
      } else {
        toast.success("Create booking successfully.");
        navigate("/thank-you");
      }
    });
  };
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i
            class="ri-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>{" "}
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* =======booking form  */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form id="form" className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className={"d-flex  align-items-center gap-3 bg-primary"}>
            <input
              type="date"
              placeholder="01/01/2024"
              id="bookAt"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
          <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              min={1}
              max={maxGroupSize}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* booking bottom */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className={"border-0 px-0"}>
            <h5 className="d-flex align-items-center gap-1">${price}</h5>{" "}
            <i class="ri-close-line"></i> 1 person
          </ListGroupItem>
          <ListGroupItem className={"border-0 px-0"}>
            <h5>Service charge</h5>
            <span>$10</span>
          </ListGroupItem>
          <ListGroupItem className={"border-0 px-0 total"}>
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button
          className={"btn primary__btn w-100 mt-4"}
          type="submit"
          form="form"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
