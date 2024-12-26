import React, { useState } from "react";
import "./Booking.scss";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useBookingTourMutation } from "../helper/bookingQuery";
import toast from "react-hot-toast";
import { getTourSchedulesByTourIdQuery } from "../helper/tourScheduleQuery";
import { Radio, Select } from "antd";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { changeFormatDate } from "../utils/changeFormatDate";
const Booking = ({ tour, avgRating }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [avaiOrNull, setAvaiOrNull] = useState(1); // Toggle between available date and new date
  const [tourScheduleId, setTourScheduleId] = useState("");
  const { _id, price, reviews, maxGroupSize } = tour || {};
  const { data = [], isLoading } = getTourSchedulesByTourIdQuery(_id);

  const serviceFee = 10;

  const { mutate } = useBookingTourMutation();

  // Validation Schema
  const validationSchema = yup.object({
    username: yup.string().required("Full Name is required"),
    phone: yup.string().required("Phone is required"),
    availableDate: yup.string().when("avaiOrNull", {
      is: 1,
      then: yup.string().required("Please select a date"),
    }),
    guestSize: yup
      .number()
      .min(1, "Minimum 1 guest")
      .max(maxGroupSize, `Maximum ${maxGroupSize} guests allowed`)
      .required("Guest Size is required"),
  });

  const handleSubmit = (values) => {
    console.log("Values is ", values);
    if (!user) {
      toast.error("Please Sign In");
      navigate("/login");
      return;
    }

    const booking = {
      customerId: user._id,
      username: values.username,
      phone: values.phone,
      guestSize: values.guestSize,
      tour_schedule_id: values.availableDate,
      tourId:_id,
      bookingDate:changeFormatDate(values.bookingDate),
      totalPrice: Number(price) * Number(values.guestSize) + serviceFee,
    };

    mutate(booking, {
      onSuccess: () => {
        toast.success("Booking created successfully!");
        navigate("/thank-you");
      },
      onError: (error) => {
        toast.error(error.message || "Booking failed");
      },
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
            className="ri-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>
          {avgRating > 0 && avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking Form */}
      <div className="booking__form">
        <h5>Information</h5>
        <Formik
          initialValues={{
            username: user?.username || "",
            phone: user?.phone || "",
            availableDate: "",
            guestSize: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            setFieldValue,
            handleSubmit,
          }) => (
            <form
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              onSubmit={handleSubmit}
            >
              <Field
                type="text"
                name="username"
                placeholder="Full Name"
                className="form-control"
                onChange={handleChange}
                value={values.username}
              />
              {errors.username && touched.username && (
                <div className="error">{errors.username}</div>
              )}

              <Field
                type="text"
                name="phone"
                placeholder="Phone"
                className="form-control"
                onChange={handleChange}
                value={values.phone}
              />
              {errors.phone && touched.phone && (
                <div className="error">{errors.phone}</div>
              )}

              <Radio.Group
                onChange={(e) => setAvaiOrNull(e.target.value)}
                value={avaiOrNull}
              >
                <Radio value={1}>Available Date</Radio>
                <Radio value={2}>Book New Date</Radio>
              </Radio.Group>

              {avaiOrNull === 1 ? (
                <>
                  <Select
                    placeholder="Select available date"
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setFieldValue("availableDate", value);
                      setTourScheduleId(value);
                    }}
                    options={data?.map((item) => ({
                      value: item._id,
                      label: changeFormatDate(item.available_date),
                    }))}
                  />
                  <div>
                    Available Slots :{" "}
                    {data?.find(
                      (item) => item._id === tourScheduleId
                    )?.available_capacity
                    }
                  </div>
                  {errors.availableDate && touched.availableDate && (
                    <div className="error">{errors.availableDate}</div>
                  )}
                </>
              ) : (
                <Field
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  className="form-control"
                  onChange={(e)=>{
                    setFieldValue("bookingDate", e.target.value);
                  }}
                />
              )}

              <Field
                type="number"
                name="guestSize"
                placeholder="Guest Size"
                className="form-control"
                min={1}
                max={maxGroupSize}
                onChange={handleChange}
                value={values.guestSize}
              />
              {errors.guestSize && touched.guestSize && (
                <div className="error">{errors.guestSize}</div>
              )}
              {/* Booking Summary */}
              <div className="booking__bottom">
                <div className="border-0 px-0 service-fee">
                  <div>Service Fee</div>
                  <div>${serviceFee}</div>
                </div>
                <div className="border-0 px-0 total">
                  <div>Total</div>
                  <div>${price * values.guestSize + serviceFee}</div>
                </div>
              </div>
              <Button className="btn primary__btn w-100" type="submit">
                Book Now
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Booking;
