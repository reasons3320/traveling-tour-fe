import React, { useContext, useEffect, useState } from "react";
import "./Booking.scss";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useBookingTourMutation } from "../../helper/bookingQuery";
import toast from "react-hot-toast";
import { getTourSchedulesByTourIdQuery } from "../../helper/tourScheduleQuery";
import { Radio, Select } from "antd";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { changeFormatDate } from "../../utils/changeFormatDate";
import { IoTennisball } from "react-icons/io5";
import { logout } from "../../redux/userSlice";
import moment from "moment";
import { languageContext } from "../../context/LanguageContext";
import { getContentByLanguage } from "../../context/languageUseCase";
import { bookingContent } from "./booking.lang";
const Booking = ({ tour, avgRating }) => {
  const { handleChangeLanguage } = useContext(languageContext);
  const language = getContentByLanguage(bookingContent);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [avaiOrNull, setAvaiOrNull] = useState(1); // Toggle between available date and new date
  const [tourScheduleId, setTourScheduleId] = useState("");
  const { _id, price, reviews, maxGroupSize } = tour || {};
  const [availableTourDate, setAvailableTourDate] = useState([]);
  const [currentTourSchedule, setCurrentTourSchedule] = useState();
  const { data = [], isLoading } = getTourSchedulesByTourIdQuery(_id);
  useEffect(() => {
    const newArr = data.filter((item) => item?.userId?.role !== "Customer");
    setAvailableTourDate(newArr);
  }, [data]);
  useEffect(() => {
    const current = availableTourDate?.find(
      (item) => item._id === tourScheduleId
    );
    setCurrentTourSchedule(current);
  }, [tourScheduleId]);
  const serviceFee = 10;

  const { mutate, isPending } = useBookingTourMutation();

  // Validation Schema
  const validationSchema = yup.object({
    username: yup.string().required(language.fullNamePlaceholder),
    phone: yup.string().required(language.phonePlaceholder),
    availableDate: yup.string().required("Please choose day !"),
    guestSize: yup
      .number()
      .min(1, "Minimum 1 guest")
      .max(
        currentTourSchedule?.available_capacity
          ? currentTourSchedule?.available_capacity
          : 20,
        `Maximum ${
          currentTourSchedule?.available_capacity || 20
        } guest slots remain`
      )
      .required("Guest Size is required"),
  });

  const handleSubmit = (values) => {
    if (!user) {
      toast.error("Please Sign In");
      dispatch(logout());
      navigate("/login");
      return;
    }

    const booking = {
      customerId: user._id,
      username: values.username,
      phone: values.phone,
      guestSize: values.guestSize,
      tour_schedule_id: values.availableDate,
      tourId: _id,
      bookingDate: changeFormatDate(values.availableDate),
      totalPrice: Number(price) * Number(values.guestSize) + serviceFee,
    };

    mutate(booking, {
      onSuccess: () => {
        toast.success("Booking created successfully!");
        navigate("/thank-you");
      },
      onError: (error) => {
        toast.error(error.message || "Booking failed");
        dispatch(logout());
        navigate("/login");
      },
    });
  };
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/{language.person}</span>
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
        <h5>{language.clientInformation}</h5>
        <Formik
          initialValues={{
            username: user?.username || "",
            phone: user?.phone || "",
            availableDate: moment().format("YYYY-MM-DD"),
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
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              onSubmit={handleSubmit}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label htmlFor="username">{language.fullName}</label>
                <Field
                  id="username"
                  type="text"
                  name="username"
                  placeholder={language.fullName}
                  className="form-control"
                  onChange={handleChange}
                  value={values.username}
                />

                {errors.username && touched.username && (
                  <div className="error">{errors.username}</div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label htmlFor="username">{language.phone}</label>
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
              </div>
              <Radio.Group
                onChange={(e) => setAvaiOrNull(e.target.value)}
                value={avaiOrNull}
              >
                <Radio value={1}>{language.availableDate}</Radio>
                <Radio value={2}>{language.bookingNewDate}</Radio>
              </Radio.Group>
              <div>
                {avaiOrNull === 1 ? (
                  <div
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Select
                      className="custom-select"
                      placeholder={language.availableDatePlaceholder}
                      style={{ width: "100%" }}
                      onChange={(value) => {
                        setFieldValue("availableDate", value);
                        setTourScheduleId(value);
                      }}
                      options={availableTourDate?.map((item) => ({
                        value: item._id,
                        label: changeFormatDate(item.available_date),
                      }))}
                    />
                    {errors.availableDate && touched.availableDate && (
                      <div className="error">{errors.availableDate}</div>
                    )}
                  </div>
                ) : (
                  <>
                    <Field
                      type="date"
                      id="availableDate"
                      name="availableDate"
                      className="form-control"
                      onChange={(e) => {
                        setFieldValue("availableDate", e.target.value);
                      }}
                    />
                    {errors.availableDate && touched.availableDate && (
                      <div className="error">{errors.availableDate}</div>
                    )}
                  </>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {avaiOrNull == 1
                  ? language.bookingRemainSlots
                  : language.bookingSlots}
                {avaiOrNull == 1 &&
                  data?.find((item) => item._id === tourScheduleId)
                    ?.available_capacity}
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
              </div>

              {/* Booking Summary */}
              <div className="booking__bottom">
                <div className="border-0 px-0 service-fee">
                  <div>{language.serviceFee}</div>
                  <div>${serviceFee}</div>
                </div>
                <div className="border-0 px-0 total">
                  <div>{language.total}</div>
                  <div>${price * values.guestSize + serviceFee}</div>
                </div>
              </div>
              <Button
                className="btn primary__btn w-100"
                type="submit"
                disabled={isPending}
              >
                {isPending ? <div>Loading...</div> : "Book Now"}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Booking;
